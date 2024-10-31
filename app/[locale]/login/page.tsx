"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { DatePicker } from "@nextui-org/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { parseDate } from "@internationalized/date";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import { IoIosClose, IoIosEye, IoIosEyeOff } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { HiArrowNarrowLeft } from "react-icons/hi";

const FormStep = () => {
  const [step, setStep] = useState(1);

  const handlePreviousStep = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    firstName: false,
    lastName: false,
    dateOfBirth: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNextStep = () => {
    if (step === 1) {
      const errors = {
        firstName: !formData.firstName,
        lastName: !formData.lastName,
        dateOfBirth: !formData.dateOfBirth,
        phone: !formData.phone,
        email: false,
        password: false,
        confirmPassword: false,
      };
      setValidationErrors(errors);

      if (!Object.values(errors).slice(0, 4).includes(true)) {
        setStep(2);
      }
    } else if (step === 2) {
      const errors = {
        email: !formData.email || !isValidEmail(formData.email),
        password: !formData.password,
        confirmPassword:
          !formData.confirmPassword ||
          formData.password !== formData.confirmPassword,
        firstName: false,
        lastName: false,
        dateOfBirth: false,
        phone: false,
      };
      setValidationErrors(errors);

      if (!Object.values(errors).slice(0, 3).includes(true)) {
        setStep(3);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "confirmPassword" || name === "password") {
      setPasswordMatch(
        formData.password.length === value.length &&
          formData.password === value,
      );
    }

    if (name === "phone") {
      const phoneNumber = parsePhoneNumberFromString(`+${value}`);
      if (phoneNumber) {
        formattedValue = phoneNumber.formatInternational();
      }
    }

    setValidationErrors({ ...validationErrors, [name]: false });
  };

  const [passwordMatch, setPasswordMatch] = useState<null | boolean>(null);

  const passwordMeetsRequirements = (password: string) => {
    return {
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasMin: password.length >= 8,
    };
  };

  const requirements = passwordMeetsRequirements(formData.password);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const [formType, setFormType] = useState<"register" | "login">("register");

  const handleLogin = () => {
    const isEmailValid = isValidEmail(formData.email);

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      email: !isEmailValid,
    }));

    if (isEmailValid) {
      console.log("Logging in...");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <AnimatePresence mode="wait">
        {formType === "register" ? (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="flex min-h-[50vh] w-full max-w-5xl rounded-lg bg-white shadow-lg"
          >
            <div className="flex w-full flex-col">
              <div className="flex w-full items-center rounded-t-lg text-white">
                <div
                  className={`flex w-1/2 justify-center rounded-tl-lg border-2 border-[#C2272C] transition-colors ease-in-out hover:bg-[#C2272C] hover:font-bold hover:text-white ${
                    formType === "register"
                      ? "bg-[#C2272C] font-bold text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <button
                    className="w-full p-6 uppercase"
                    onClick={() => setFormType("register")}
                  >
                    Register
                  </button>
                </div>
                <div
                  className={`flex w-1/2 justify-center rounded-tr-lg border-2 border-[#C2272C] transition-colors ease-in-out hover:bg-[#C2272C] hover:font-bold hover:text-white ${
                    formType === "login"
                      ? "bg-[#C2272C] font-bold text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <button
                    className="w-full p-6 uppercase"
                    onClick={() => setFormType("login")}
                  >
                    Login
                  </button>
                </div>
              </div>
              <div className="flex min-h-[50vh] w-full flex-row border p-4">
                <div className="flex w-1/3 flex-grow rounded-xl bg-[#C2272C] p-8 text-white">
                  <div className="space-y-8">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: step >= 1 ? 1.2 : 1 }}
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          step >= 1 ? "bg-[#6d1619]" : "bg-transparent"
                        } font-bold text-white`}
                      >
                        1
                      </motion.div>
                      <div className="flex flex-col">
                        <span className="text-xs font-light">STEP 1</span>
                        <span className="text-base font-semibold uppercase">
                          Personal Info
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <motion.div
                        initial={{ scale: 1 }}
                        animate={{
                          scale: step >= 2 ? 1.2 : 1,
                          backgroundColor:
                            step >= 2 ? "#6d1619" : "transparent",
                          borderColor: step >= 2 ? "#6d1619" : "white",
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-full border font-bold text-white"
                      >
                        2
                      </motion.div>
                      <div className="flex flex-col">
                        <span className="text-xs font-light">STEP 2</span>
                        <span className="text-base font-semibold uppercase">
                          Login Info
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <motion.div
                        initial={{ scale: 1 }}
                        animate={{
                          scale: step >= 3 ? 1.2 : 1,
                          backgroundColor:
                            step >= 3 ? "#6d1619" : "transparent",
                          borderColor: step >= 3 ? "#6d1619" : "white",
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-transparent font-bold text-white"
                      >
                        3
                      </motion.div>
                      <div className="flex flex-col">
                        <span className="text-xs font-light">STEP 3</span>
                        <span className="text-base font-semibold uppercase">
                          Review
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Section */}
                <div className="flex w-2/3 flex-col justify-between p-10">
                  {step === 1 && (
                    <div className="flex flex-col">
                      <div className="flex flex-row justify-between">
                        <h2 className="text-2xl font-bold text-gray-800">
                          Personal Info
                        </h2>
                        {step > 1 && (
                          <motion.div
                            className="flex cursor-pointer justify-end text-2xl text-[#C2272C]"
                            onClick={handlePreviousStep}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <HiArrowNarrowLeft />
                          </motion.div>
                        )}
                      </div>

                      <p className="mb-6 text-gray-500">
                        Please provide your name, date of birth, and phone
                        number.
                      </p>
                      <form className="space-y-4">
                        {/* Form fields for Personal Info */}
                        <div className="flex w-full gap-4">
                          <div className="w-1/2">
                            <label className="mb-1 block text-black">
                              First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              placeholder="e.g. Stephen"
                              value={formData.firstName}
                              onChange={handleChange}
                              className={`w-full rounded-md border p-2 text-black focus:border-blue-500 focus:outline-none ${
                                validationErrors.firstName
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              required
                            />
                          </div>
                          <div className="w-1/2">
                            <label className="mb-1 block text-black">
                              Middle Name
                            </label>
                            <input
                              type="text"
                              name="middleName"
                              placeholder="e.g. Edwin"
                              value={formData.middleName}
                              onChange={handleChange}
                              className="w-full rounded-md border border-gray-300 p-2 text-black focus:border-blue-500 focus:outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="mb-1 block text-black">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            placeholder="e.g. King"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`w-full rounded-md border p-2 text-black focus:border-blue-500 focus:outline-none ${
                              validationErrors.lastName
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            required
                          />
                        </div>
                        <div className="text-black">
                          <DatePicker
                            label="Date of Birth"
                            classNames={{
                              base: "rounded-lg ",
                              selectorButton: "bg-[#C2272C] text-white",
                              selectorIcon: "text-white",
                              popoverContent: "shadow-lg",
                              calendar: "w-full",
                            }}
                            dateInputClassNames={{
                              base: "w-full",
                              label: "text-black text-base mb-1",
                              inputWrapper: `rounded-lg border border-gray-300 ${
                                validationErrors.dateOfBirth
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`,
                              input: "text-black",
                            }}
                            labelPlacement="outside"
                            variant="bordered"
                            maxValue={today(getLocalTimeZone())}
                            showMonthAndYearPickers
                            isRequired
                            value={
                              formData.dateOfBirth
                                ? parseDate(formData.dateOfBirth)
                                : undefined
                            }
                            onChange={(date) =>
                              setFormData({
                                ...formData,
                                dateOfBirth: date?.toString(),
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-black">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <PhoneInput
                            country={"ca"}
                            value={formData.phone}
                            onChange={(phone) => {
                              const phoneNumber = parsePhoneNumberFromString(
                                `+${phone}`,
                              );
                              const formattedPhone = phoneNumber
                                ? phoneNumber.formatInternational()
                                : phone;
                              setFormData({
                                ...formData,
                                phone: formattedPhone,
                              });
                            }}
                            inputProps={{
                              name: "phone",
                              required: true,
                              autoFocus: false,
                            }}
                            containerClass={`w-full text-black rounded-lg ${
                              validationErrors.phone
                                ? "border border-red-500"
                                : "border-none "
                            }`}
                            inputClass="w-full rounded-lg border p-5 text-black focus:border-blue-500 focus:outline-none"
                            buttonClass="rounded-l-lg"
                            placeholder="Enter your phone number"
                            enableSearch={true}
                            inputStyle={{
                              width: "100%",
                              borderStartStartRadius: "0.5rem",
                              borderStartEndRadius: "0.5rem",
                              borderEndStartRadius: "0.5rem",
                              borderEndEndRadius: "0.5rem",
                            }}
                            buttonStyle={{
                              borderStartStartRadius: "0.5rem",
                              borderBottomLeftRadius: "0.5rem",
                            }}
                          />
                        </div>
                      </form>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="flex flex-col">
                      <div className="flex flex-row justify-between">
                        <h2 className="text-2xl font-bold text-gray-800">
                          Login Info
                        </h2>
                        {step > 1 && (
                          <motion.div
                            className="flex cursor-pointer justify-end text-2xl text-[#C2272C]"
                            onClick={handlePreviousStep}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <HiArrowNarrowLeft />
                          </motion.div>
                        )}
                      </div>
                      <p className="mb-6 text-gray-500">
                        Please provide your email, and set a password for your
                        account.
                      </p>
                      <form className="space-y-6">
                        <div className="relative">
                          <label className="mb-1 block text-black">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            placeholder="e.g. stephen@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full rounded-md border border-gray-300 p-2 text-black focus:border-blue-500 focus:outline-none ${
                              validationErrors.email
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            required
                          />
                          <p
                            className={`absolute top-full mt-1 flex items-center text-xs ${validationErrors.email ? "text-red-500" : "invisible"}`}
                          >
                            Enter a valid email address.
                          </p>
                        </div>

                        <div className="relative">
                          <label className="mb-1 block text-black">
                            Password <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              placeholder="Enter your password"
                              value={formData.password}
                              onChange={handleChange}
                              className={`w-full rounded-md border border-gray-300 p-2 text-black focus:border-blue-500 focus:outline-none ${
                                validationErrors.password
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              required
                            />
                            {/* Eye icon for toggling password visibility */}
                            <div
                              onClick={togglePasswordVisibility}
                              className="absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-500"
                            >
                              {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                            </div>
                          </div>
                          <p className="pt-1 text-xs text-gray-500">
                            Passwords must have at least 8 characters and
                            contain one uppercase letter, one number, and one
                            symbol.
                          </p>
                          <p
                            className={`flex items-center pt-1 text-xs ${requirements.hasMin ? "text-green-600" : "text-red-600"}`}
                          >
                            {requirements.hasMin ? <TiTick /> : <IoIosClose />}{" "}
                            Minimum 8 Characters
                          </p>
                          <p
                            className={`flex items-center pt-1 text-xs ${requirements.hasUppercase ? "text-green-600" : "text-red-600"}`}
                          >
                            {requirements.hasUppercase ? (
                              <TiTick />
                            ) : (
                              <IoIosClose />
                            )}{" "}
                            Uppercase
                          </p>
                          <p
                            className={`flex items-center pt-1 text-xs ${requirements.hasNumber ? "text-green-600" : "text-red-600"}`}
                          >
                            {requirements.hasNumber ? (
                              <TiTick />
                            ) : (
                              <IoIosClose />
                            )}{" "}
                            Number
                          </p>
                          <p
                            className={`flex items-center pt-1 text-xs ${requirements.hasSymbol ? "text-green-600" : "text-red-600"}`}
                          >
                            {requirements.hasSymbol ? (
                              <TiTick />
                            ) : (
                              <IoIosClose />
                            )}{" "}
                            Symbol
                          </p>
                          {formData.password.length >= 8 &&
                            !passwordMeetsRequirements(formData.password) && (
                              <p className="text-xs text-red-600">
                                Password does not meet requirements
                              </p>
                            )}
                        </div>

                        <div className="relative">
                          <label className="mb-1 block text-black">
                            Retype Password{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              name="confirmPassword"
                              placeholder="Retype your password"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              className={`w-full rounded-md border border-gray-300 p-2 text-black focus:border-blue-500 focus:outline-none ${
                                validationErrors.confirmPassword
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              required
                            />
                            {/* Eye icon for toggling confirm password visibility */}
                            <div
                              onClick={toggleConfirmPasswordVisibility}
                              className="absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-500"
                            >
                              {showConfirmPassword ? (
                                <IoIosEye />
                              ) : (
                                <IoIosEyeOff />
                              )}
                            </div>
                          </div>
                          {formData.confirmPassword && (
                            <p
                              className={`absolute top-full mt-1 flex items-center text-xs ${
                                passwordMatch
                                  ? "text-green-600"
                                  : "text-red-600"
                              } ${formData.confirmPassword.length === formData.password.length && formData.password.length >= 8 ? "" : "invisible"}`}
                            >
                              {passwordMatch ? <TiTick /> : <IoIosClose />}
                              {passwordMatch
                                ? "Passwords match"
                                : "Passwords do not match"}
                            </p>
                          )}
                        </div>
                      </form>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="flex flex-col">
                      <div className="flex flex-row justify-between">
                        <h2 className="text-2xl font-bold text-gray-800">
                          Review
                        </h2>
                        {step > 1 && (
                          <motion.div
                            className="flex cursor-pointer justify-end text-2xl text-[#C2272C]"
                            onClick={handlePreviousStep}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <HiArrowNarrowLeft />
                          </motion.div>
                        )}
                      </div>
                      <p className="mb-6 text-gray-500">
                        Please check if provided information is correct.
                      </p>
                      <div className="flex flex-col space-y-8">
                        <div className="flex flex-row">
                          <div className="flex w-1/2">
                            <label className="mb-1 mr-2 block font-bold text-black">
                              Name:{" "}
                            </label>
                            <p>{formData.firstName}</p>
                          </div>
                          <div className="mr-2 flex w-1/2 flex-row">
                            <label className="mb-1 mr-2 block font-bold text-black">
                              Middle Name:
                            </label>
                            <p>{formData.middleName}</p>
                          </div>
                        </div>

                        <div className="flex flex-row">
                          <label className="mb-1 mr-2 block font-bold text-black">
                            Last Name:{" "}
                          </label>
                          <p>{formData.lastName}</p>
                        </div>
                        <div className="flex flex-row">
                          <label className="mb-1 mr-2 block font-bold text-black">
                            Date of Birth:
                          </label>
                          <p>{formData.dateOfBirth}</p>
                        </div>
                        <div className="flex flex-row">
                          <label className="mb-1 mr-2 block font-bold text-black">
                            Phone Number:
                          </label>
                          <p>{formData.phone}</p>
                        </div>
                        <div className="flex flex-row">
                          <label className="mb-1 mr-2 block font-bold text-black">
                            Email:{" "}
                          </label>
                          <p>{formData.email}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="rounded-md bg-[#C2272C] px-6 py-2 text-white hover:bg-red-700 focus:outline-none"
                    >
                      {step !== 3 ? "Next Step" : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="flex min-h-[50vh] w-full max-w-5xl rounded-lg bg-white shadow-lg"
          >
            {" "}
            <div className="flex w-full flex-col">
              <div className="flex w-full items-center rounded-t-lg text-white">
                <div
                  className={`flex w-1/2 justify-center rounded-tl-lg border-2 border-[#C2272C] transition-colors ease-in-out hover:bg-[#C2272C] hover:font-bold hover:text-white ${
                    formType === "register"
                      ? "bg-[#C2272C] font-bold text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <button
                    className="w-full p-6 uppercase"
                    onClick={() => setFormType("register")}
                  >
                    Register
                  </button>
                </div>
                <div
                  className={`flex w-1/2 justify-center rounded-tr-lg border-2 border-[#C2272C] transition-colors ease-in-out hover:bg-[#C2272C] hover:font-bold hover:text-white ${
                    formType === "login"
                      ? "bg-[#C2272C] font-bold text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <button
                    className="w-full p-6 uppercase"
                    onClick={() => setFormType("login")}
                  >
                    Login
                  </button>
                </div>
              </div>
              <div className="flex min-h-[50vh] w-full flex-row border p-4">
                <div
                  className="flex w-1/3 flex-grow rounded-xl p-8 text-white"
                  style={{
                    backgroundImage: "url('/resources/accounting.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="space-y-8">
                    <div className="flex items-center space-x-3"></div>
                    <div className="flex items-center space-x-3"></div>
                    <div className="flex items-center space-x-3"></div>
                  </div>
                </div>

                {/* Form Section */}
                <div className="flex w-2/3 flex-col justify-between p-10">
                  <div className="flex flex-col">
                    <div className="mb-6 flex flex-row justify-between">
                      <h2 className="text-2xl font-bold text-gray-800">
                        Login
                      </h2>
                    </div>

                    <form className="space-y-2">
                      {/* Form fields for Personal Info */}
                      <div>
                        <label className="mb-1 block text-black">Email</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="e.g. stephen@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className={`w-full rounded-md border p-2 text-black focus:border-blue-500 focus:outline-none ${
                            validationErrors.email
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        <p
                          className={`top-full mt-1 flex items-center text-xs ${validationErrors.email ? "text-red-500" : "invisible"}`}
                        >
                          Enter a valid email address.
                        </p>
                      </div>
                      <div className="relative">
                        <label className="mb-1 block text-black">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full rounded-md border border-gray-300 p-2 text-black focus:border-blue-500 focus:outline-none ${
                              validationErrors.password
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            required
                          />
                          {/* Eye icon for toggling password visibility */}
                          <div
                            onClick={togglePasswordVisibility}
                            className="absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-500"
                          >
                            {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={handleLogin}
                      className="rounded-md bg-[#C2272C] px-6 py-2 text-white hover:bg-red-700 focus:outline-none"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormStep;
