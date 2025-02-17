"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import {
  format,
  addDays,
  startOfMonth,
  lastDayOfMonth,
  addMonths,
  isBefore,
  startOfToday,
} from "date-fns";

import { tr, enUS } from "date-fns/locale";

import { FaExclamation } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import nookies from "nookies";

const AppointmentPage = () => {
  const t = useTranslations("appointment");

  const [currentLocale, setCurrentLocale] = useState("en");
  const pathname = usePathname(); // For current path

  const getLocale = (currentLocale: string) => {
    return currentLocale === "tr" ? tr : enUS; // Default to English if not Turkish
  };

  useEffect(() => {
    const cookies = nookies.get();
    const localeFromCookies = cookies.locale || "en"; // Default to 'en' if no cookie is set
    const localeFromPath = pathname.split("/")[1];
    setCurrentLocale(localeFromPath || localeFromCookies);
  }, [pathname]);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const [appointmentDetails, setAppointmentDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false); // Add loading state
  const [confirmed, setConfirmed] = useState<null | boolean>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (confirmed === false) {
      const timer = setTimeout(() => {
        setConfirmed(null); // Reset to null after 1.5 seconds
      }, 1500);

      return () => clearTimeout(timer); // Cleanup timeout to prevent memory leaks
    } else {
      const timer = setTimeout(() => {
        setConfirmed(null); // Reset to null after 1.5 seconds
      }, 1500);

      return () => clearTimeout(timer); // Cleanup timeout to prevent memory leaks
    }
  }, [confirmed]);

  useEffect(() => {
    fetchAvailableTimes(selectedDate);
  }, [selectedDate]);

  const fetchAvailableTimes = async (date: Date) => {
    try {
      const response = await fetch(
        `http://localhost:9090/api/availability?date=${format(
          date,
          "yyyy-MM-dd",
        )}&timezone=America/Toronto`,
      );
      if (response.ok) {
        const times = await response.json();
        setAvailableTimes(times); // Store available times in state
      } else {
        console.error("Failed to fetch available times");
      }
    } catch (error) {
      console.error("Error fetching available times:", error);
    }
  };

  const isTimeDisabled = (time: string) => {
    // Convert current time to Toronto time
    const nowInToronto = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "America/Toronto",
      }),
    );

    // Combine the selected date with the provided time
    const timeSlot = new Date(
      format(selectedDate, "yyyy-MM-dd") + "T" + time + ":00",
    );

    return isBefore(timeSlot, nowInToronto);
  };

  const getDaysInMonth = (date: Date) => {
    const startDate = startOfMonth(date);
    const endDate = lastDayOfMonth(date);
    const days = [];

    let day = startDate;
    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    // Validate firstName and lastName
    if (firstName.trim() === "" || lastName.trim() === "") {
      setErrorMessage(t("name_error"));
      setShowPopup(true);
      return;
    }

    // Validate email
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(email)) {
      setErrorMessage(t("email_error"));
      setShowPopup(true);
      return;
    }

    // Validate phone
    if (phone.trim() === "") {
      setErrorMessage(t("phone_error"));
      setShowPopup(true);
      return;
    }

    // Validate if time is selected
    if (!selectedTime) {
      setErrorMessage(t("time_error"));
      setShowPopup(true);
      return;
    }

    // Format the phone number using libphonenumber-js
    const phoneNumber = parsePhoneNumberFromString(`+${phone}`);
    const formattedPhone = phoneNumber
      ? phoneNumber.formatInternational()
      : phone;

    // Format time in 12-hour format
    const timeIn12HrFormat = format(
      new Date(`1970-01-01T${selectedTime}:00`),
      "hh:mm a",
    );

    setAppointmentDetails({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: formattedPhone,
      date: format(selectedDate, "EEEE, MMMM d, yyyy"),
      time: timeIn12HrFormat,
    });

    setErrorMessage("");
    setShowPopup(true);
  };

  const handleConfirm = async () => {
    setLoading(true);

    const startTime = Date.now();
    try {
      const response = await fetch("http://localhost:9090/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: appointmentDetails.firstName,
          lastName: appointmentDetails.lastName,
          email: appointmentDetails.email,
          phone: appointmentDetails.phone,
          appointmentDate: format(selectedDate, "yyyy-MM-dd"),
          appointmentTime: selectedTime,
        }),
      });

      if (response.ok) {
        setConfirmed(true); // Show success modal only if response is successful
        setShowPopup(false); // Close confirmation modal
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "An error occurred.");
        setConfirmed(false); // Ensure no success modal on error
        setShowPopup(false); // Display error in popup modal
      }
    } catch (error) {
      console.error("Failed to book the appointment:", error);
      setErrorMessage(
        "Failed to book the appointment. Please try again later.",
      );
      setConfirmed(false); // Ensure no success modal on connection error
      setShowPopup(false); // Display error in popup modal
    } finally {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = 1500 - elapsedTime; // Calculate the remaining time to ensure 1.5 seconds

      setTimeout(
        () => {
          setLoading(false); // Set loading to false after at least 1.5 seconds
        },
        Math.max(remainingTime, 0),
      );

      setSelectedTime("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("1");
      fetchAvailableTimes(selectedDate);
    }
  };

  const days = getDaysInMonth(selectedDate);
  const today = startOfToday();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100 py-12 text-black">
      <div className="relative">
        {/* Spinner with black overlay */}
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
              className="h-16 w-16 rounded-full border-4 border-gray-300 border-t-[#C2272C]"
              animate={{
                rotate: 360,
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "linear",
              }}
            />
          </div>
        )}

        {/* Modal for confirmation or error */}
        {confirmed !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full max-w-md items-center rounded-lg bg-white p-6 shadow-lg"
            >
              {confirmed ? (
                <>
                  <div className="flex flex-row">
                    <SiTicktick className="mr-4 text-4xl text-green-600" />
                    <div className="flex flex-col">
                      <h3 className="mb-2 text-xl font-bold">
                        Appointment Confirmed!
                      </h3>
                      <p>Your appointment has been successfully booked.</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-row">
                    <FaExclamation className="mr-4 text-4xl text-red-600" />
                    <div className="flex flex-col">
                      <h3 className="mb-2 text-xl font-bold">Error</h3>
                      <p>
                        There was an error while booking your appointment.
                        Please try again later.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </div>

      <h1 className="mb-8 text-2xl font-bold md:text-3xl lg:text-3xl xl:text-4xl">
        {t("schedule_appointment")}
      </h1>

      {showPopup && errorMessage ? (
        <PopupModal
          title={t("error")}
          message={errorMessage}
          isError={true}
          onCancel={() => setShowPopup(false)}
        />
      ) : (
        showPopup && (
          <PopupModal
            title={t("confirmation")}
            message={`Are you sure you want to book your appointment with the following details?<br />
        <strong>First Name:</strong> ${appointmentDetails.firstName}<br />
        <strong>Last Name:</strong> ${appointmentDetails.lastName}<br />
        <strong>Email:</strong> ${appointmentDetails.email}<br />
        <strong>Phone:</strong> ${appointmentDetails.phone}<br />
        <strong>Date:</strong> ${appointmentDetails.date}<br />
        <strong>Time:</strong> ${appointmentDetails.time}`}
            onConfirm={handleConfirm}
            onCancel={() => setShowPopup(false)}
          />
        )
      )}

      <div className="mb-8 flex w-[95%] max-w-4xl space-x-12 rounded-lg bg-white p-6 shadow-lg md:w-full lg:w-full xl:w-full">
        <div className="flex w-full flex-col space-y-4">
          {/* First Name Field */}
          <div className="flex w-full flex-row items-center">
            <label
              htmlFor="firstName"
              className="block w-1/2 text-lg font-medium"
            >
              {t("first_name") + ":"}
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-3"
              placeholder="Enter your first name"
              required
            />
          </div>

          {/* Last Name Field */}
          <div className="flex w-full flex-row items-center">
            <label
              htmlFor="lastName"
              className="block w-1/2 text-lg font-medium"
            >
              {t("last_name") + ":"}
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-3"
              placeholder="Enter your last name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="flex w-full flex-row items-center">
            <label htmlFor="email" className="block w-1/2 text-lg font-medium">
              {t("email") + ":"}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-3"
              placeholder="Enter your email"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              onInvalid={(e) =>
                (e.target as HTMLInputElement).setCustomValidity(
                  "Please enter a valid email address.",
                )
              }
              onInput={(e) =>
                (e.target as HTMLInputElement).setCustomValidity("")
              } // Reset message after input
            />
          </div>
          {/* Phone Number Field */}
          <div className="flex w-full flex-row items-center">
            <label htmlFor="phone" className="block w-1/2 text-lg font-medium">
              {t("phone_number") + ":"}
            </label>
            <div className="flex w-full">
              <PhoneInput
                country={"ca"}
                value={phone}
                onChange={handlePhoneChange}
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: false,
                  autoComplete: "off",
                }}
                containerClass="w-full"
                inputClass="w-full p-6 rounded-lg border border-gray-300"
                buttonClass="rounded-l-lg"
                placeholder="Enter your phone number"
                enableSearch={true}
                inputStyle={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-4xl flex-col items-center space-y-12 md:flex-row md:space-x-12 lg:flex-row lg:space-x-12 xl:flex-row xl:space-x-12">
        {/* Calendar Section */}
        <div className="w-[95%] md:w-1/2 lg:w-1/2 xl:w-1/2">
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => setSelectedDate(addMonths(selectedDate, -1))}
              className="text-lg font-bold"
            >
              {"<"}{" "}
              {format(addMonths(selectedDate, -1), "MMMM", {
                locale: getLocale(currentLocale),
              })}
            </button>
            <span className="text-xl font-semibold">
              {format(selectedDate, "MMMM yyyy", {
                locale: getLocale(currentLocale),
              })}
            </span>
            <button
              onClick={() => setSelectedDate(addMonths(selectedDate, 1))}
              className="text-lg font-bold"
            >
              {format(addMonths(selectedDate, 1), "MMMM", {
                locale: getLocale(currentLocale),
              }) + ">"}
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center font-semibold">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <span key={day + index}>{day}</span>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              const isDayBeforeToday = isBefore(day, today);
              return (
                <button
                  key={index}
                  className={`py-4 ${
                    format(day, "yyyy-MM-dd") ===
                    format(selectedDate, "yyyy-MM-dd")
                      ? "bg-red-500 text-white"
                      : "bg-white"
                  } rounded-lg shadow-lg hover:bg-gray-200 ${
                    isDayBeforeToday ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  onClick={() => !isDayBeforeToday && setSelectedDate(day)}
                  disabled={isDayBeforeToday}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time and Details Section */}
        <div className="w-[95%] rounded-lg bg-white p-6 shadow-lg md:w-1/2 lg:w-1/2 xl:w-1/2">
          <div className="mb-4 text-lg font-semibold">
            {format(selectedDate, "EEEE, MMMM d", {
              locale: getLocale(currentLocale),
            })}
          </div>
          <div className="mb-4 text-sm">
            <span className="font-semibold">{t("time_zone") + ":"}</span>{" "}
            EASTERN TIME - TORONTO (GMT-04:00)
          </div>

          {/* Time Selector */}
          <div className="mb-6">
            <label className="mb-2 block text-lg font-medium">
              {t("select_time")}
            </label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { time: "09:00", display: "09:00 AM" },
                { time: "09:30", display: "09:30 AM" },
                { time: "10:00", display: "10:00 AM" },
                { time: "10:30", display: "10:30 AM" },
                { time: "11:00", display: "11:00 AM" },
                { time: "11:30", display: "11:30 AM" },
                { time: "12:00", display: "12:00 PM" },
                { time: "12:30", display: "12:30 PM" },
                { time: "13:00", display: "01:00 PM" },
                { time: "13:30", display: "01:30 PM" },
                { time: "14:00", display: "02:00 PM" },
                { time: "14:30", display: "02:30 PM" },
                { time: "15:00", display: "03:00 PM" },
                { time: "15:30", display: "03:30 PM" },
                { time: "16:00", display: "04:00 PM" },
                { time: "16:30", display: "04:30 PM" },
                { time: "17:00", display: "05:00 PM" },
              ].map(({ time, display }) => {
                // Convert current time to Toronto's timezone
                const nowInToronto = new Date(
                  new Date().toLocaleString("en-US", {
                    timeZone: "America/Toronto",
                  }),
                );

                // Create a full date-time object for the time slot
                const timeSlot = new Date(
                  `${format(selectedDate, "yyyy-MM-dd")}T${time}:00`,
                );

                // Determine if the time is in the past
                const isPastTime =
                  selectedDate.toDateString() === nowInToronto.toDateString() &&
                  timeSlot.getTime() < nowInToronto.getTime();

                const isTimeUnavailable = !availableTimes.includes(time);

                return (
                  <button
                    key={time}
                    className={`py-2 ${
                      selectedTime === time
                        ? "bg-red-500 text-white"
                        : isTimeUnavailable || isPastTime
                          ? "cursor-not-allowed bg-gray-300"
                          : "bg-gray-200"
                    } rounded-lg shadow-lg hover:bg-red-300`}
                    onClick={() =>
                      !isTimeUnavailable && !isPastTime && setSelectedTime(time)
                    }
                    disabled={isTimeUnavailable || isPastTime}
                  >
                    {display}
                  </button>
                );
              })}
            </div>
          </div>

          <motion.button
            onClick={handleSubmit}
            className="mt-6 w-full rounded-lg bg-red-600 py-4 text-lg font-bold text-white hover:bg-red-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("confirm")}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const PopupModal = ({
  title,
  message,
  isError = false,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  isError?: boolean;
  onConfirm?: () => void;
  onCancel: () => void;
}) => {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = async () => {
    if (onConfirm) {
      try {
        await onConfirm();
        setConfirmed(true); // Show success message
        setTimeout(() => {
          if (onCancel) onCancel(); // Automatically close the modal
        }, 1500); // Auto-close after 1.5 seconds
      } catch (error) {
        console.error("Error during confirmation:", error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.5, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        exit={{ y: -50 }}
        className="flex w-[90%] max-w-md items-start rounded-lg bg-white p-6 shadow-lg"
      >
        {isError && (
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "easeInOut",
            }}
            className="mr-4 text-3xl font-bold text-red-600"
          >
            <FaExclamation />
          </motion.div>
        )}
        <div className="flex-1">
          <h3 className="mb-4 text-lg font-semibold">{title}</h3>
          <p dangerouslySetInnerHTML={{ __html: message }}></p>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              className="rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
              onClick={onCancel}
            >
              {isError ? "Close" : "Cancel"}
            </button>
            {!isError && onConfirm && (
              <button
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AppointmentPage;
