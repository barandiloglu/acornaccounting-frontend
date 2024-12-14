"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { HiLocationMarker } from "react-icons/hi";
import { MdPhoneInTalk } from "react-icons/md";
import { MdEditCalendar } from "react-icons/md";

import { MenuButton } from "../[locale]/MenuButton";
import MobileNavbar from "../[locale]/MobileNavbar";

import { useTranslations } from "next-intl";

import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

import nookies from "nookies";

const Navbar = () => {
  const t = useTranslations("navbar");

  const [currentLocale, setCurrentLocale] = useState("en");
  const [isOpen, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const [isLoginModalOpen, setLoginModalOpen] = useState(false); // State for login modal

  const router = useRouter();
  const pathname = usePathname(); // For current path
  const searchParams = useSearchParams(); // For query params

  useEffect(() => {
    const cookies = nookies.get();
    const localeFromCookies = cookies.locale || "en"; // Default to 'en' if no cookie is set
    const localeFromPath = pathname.split("/")[1];
    setCurrentLocale(localeFromPath || localeFromCookies);

    const token = cookies.token; // Assuming `token` is the login token
    setIsLoggedIn(!!token);
  }, [pathname]);

  const changeLanguage = (locale: string) => {
    setCurrentLocale(locale);
    nookies.set(null, "locale", locale, { path: "/" }); // Set the locale cookie

    const segments = pathname.split("/");
    segments[1] = locale;
    const newPathname = segments.join("/");
    router.push(`${newPathname}?${searchParams}`);
  };

  const handleLogout = () => {
    // Clear cookies or tokens
    nookies.destroy(null, "token");
    setIsLoggedIn(false);
    router.push(`/${currentLocale}/login`); // Redirect to login page
  };

  const toggleLoginModal = () => setLoginModalOpen(!isLoginModalOpen);

  const menuButtonStyle = {
    marginLeft: "2rem",
  };

  return (
    <motion.nav className="flex w-full flex-col">
      <div className="flex w-full justify-between bg-[#C2272C] p-4 text-white">
        <div className="flex flex-col items-start space-x-0 space-y-2 xl:flex-row xl:items-center xl:space-x-6 xl:space-y-0">
          <div className="flex items-center space-x-2">
            <HiLocationMarker className="h-8 w-8" />
            <span className="text-sm">
              1275 Finch Ave W Suite 815, North York, ON M3J 0L5
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MdPhoneInTalk className="h-8 w-8" />
            <span className="text-sm">+1 (647) 468-0737</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <motion.div
              className="flex cursor-pointer items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                document
                  .getElementById("language-dropdown")!
                  .classList.toggle("hidden");
              }}
            >
              <span>{currentLocale === "en" ? "English" : "Türkçe"}</span>{" "}
              <motion.div whileHover={{ rotate: 180 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  width="16px"
                  height="16px"
                >
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </motion.div>
            </motion.div>

            <ul
              id="language-dropdown"
              className="absolute right-0 mt-2 hidden w-32 rounded-lg border border-gray-200 bg-white text-black shadow-lg"
            >
              <li
                className="flex cursor-pointer items-center px-4 py-2 hover:rounded-t-lg hover:bg-gray-200"
                onClick={() => {
                  changeLanguage("en");
                  document
                    .getElementById("language-dropdown")!
                    .classList.add("hidden");
                }}
              >
                <Image
                  src="/resources/united-kingdom.png"
                  alt="UK Flag"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <span>English</span>
              </li>
              <li
                className="flex cursor-pointer items-center px-4 py-2 hover:rounded-b-lg hover:bg-gray-200"
                onClick={() => {
                  changeLanguage("tr");
                  document
                    .getElementById("language-dropdown")!
                    .classList.add("hidden");
                }}
              >
                <Image
                  src="/resources/turkey.png"
                  alt="Turkey Flag"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <span>Türkçe</span>
              </li>
              {isLoggedIn && (
                <li
                  className="flex cursor-pointer items-center px-4 py-2 text-red-600 hover:bg-gray-200"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between bg-white px-4 py-2">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/resources/logo.jpg"
              alt="Logo"
              width={100}
              height={100}
              className="h-auto max-w-[100px] cursor-pointer sm:max-w-[120px] md:max-w-[150px] lg:max-w-[180px]"
            />
          </Link>

          <ul className="hidden space-x-8 px-8 font-bold text-black md:flex lg:flex xl:flex">
            <motion.li whileHover={{ scale: 1.2 }}>
              <Link href={`/${currentLocale}`}>{t("navbarHome")}</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.2 }}>
              <Link href="/about">{t("navbarAbout")}</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.2 }}>
              <Link href="/services">{t("navbarServices")}</Link>
            </motion.li>
          </ul>
        </div>
        <div className="flex items-center justify-center">
          {isLoggedIn ? (
            <Link href={`/${currentLocale}/account`}>
              <motion.button
                className="px-8 font-bold text-black md:flex lg:flex xl:flex"
                whileHover={{ scale: 1.2 }}
              >
                {t("navbarAccount")}
              </motion.button>
            </Link>
          ) : (
            <Link href={`/${currentLocale}/login`}>
              <motion.button
                className="px-8 font-bold text-black md:flex lg:flex xl:flex"
                whileHover={{ scale: 1.2 }}
              >
                {t("navbarLogin")}
              </motion.button>
            </Link>
          )}
          <Link href={`/${currentLocale}/appointment`}>
            <motion.button
              className={`hidden flex-row items-center justify-center space-x-2 rounded-lg border-2 border-[#0fa94b] bg-[#0fa94b] font-bold text-white md:flex ${currentLocale === "en" ? "w-[300px]" : "w-[300px]"} h-[75px]`}
              whileHover={{
                backgroundColor: "#176937f1",
                color: "#FFFFFF",
                borderColor: "#176937f1",
              }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
            >
              {t("navbarAppointment")}
              <MdEditCalendar className="h-6 w-6 sm:h-8 sm:w-8" />
            </motion.button>
          </Link>

          <button className="z-50 flex md:hidden lg:hidden xl:hidden 2xl:hidden">
            <MenuButton
              isOpen={isOpen}
              onClick={() => setOpen(!isOpen)}
              strokeWidth="4"
              color={isOpen ? "#FFFFFF" : "#C2272C"}
              lineProps={{ strokeLinecap: "round" }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              style={menuButtonStyle}
            />
          </button>
        </div>
      </div>
      <MobileNavbar isOpen={isOpen} setOpen={setOpen} />
    </motion.nav>
  );
};

export default Navbar;
