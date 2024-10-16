"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { HiLocationMarker } from "react-icons/hi";
import { MdEdit, MdPhoneInTalk } from "react-icons/md";
import { MdEditCalendar } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

import { MenuButton } from "./MenuButton";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  const canvasStyle = {
    display: "flex",
    width: "100vw",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  };

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
              <span>English</span>
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
              <li className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-200">
                <Image
                  src="/resources/united-kingdom.png"
                  alt="UK Flag"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <span>English</span>
              </li>
              <li className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-200">
                <Image
                  src="/resources/turkey.png"
                  alt="Turkey Flag"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <span>Türkçe</span>
              </li>
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
              className="cursor-pointer"
            />
          </Link>
          <ul className="hidden space-x-8 px-8 font-bold text-black md:flex lg:flex xl:flex">
            <motion.li whileHover={{ scale: 1.2 }}>
              <Link href="/">HOME</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.2 }}>
              <Link href="/about">ABOUT</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.2 }}>
              <Link href="/services">SERVICES</Link>
            </motion.li>
          </ul>
        </div>
        <div className="flex items-center justify-center">
          <Link href="/appointment">
            <motion.button
              className="text-md hidden flex-row items-center space-x-8 rounded-xl border-2 border-[#0fa94b] bg-[#0fa94b] px-6 py-4 font-bold text-white md:flex lg:flex xl:flex"
              whileHover={{
                backgroundColor: "#176937f1", // Red background
                color: "#FFFFFF", // White text color
                borderColor: "#176937f1", // Red border color
              }}
              transition={{ ease: "easeInOut", duration: 0.3 }} // Ease in-out for smoothness
            >
              Schedule an Appointment
              <MdEditCalendar className="h-8 w-8" />
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
