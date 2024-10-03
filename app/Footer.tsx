"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="flex w-full flex-col justify-around bg-white px-12 py-8 lg:flex-row">
        {/* Left Section: Logo */}
        <div className="flex flex-col items-center space-y-6 lg:w-1/3">
          <Link href="/">
            <Image
              src="/resources/footer-logo.jpg"
              alt="Logo"
              width={200}
              height={200}
              className="cursor-pointer"
            />
          </Link>
        </div>

        <div className="mt-8 flex justify-center lg:mt-0 lg:w-1/3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.626543792646!2d-79.48220778450252!3d43.76111797911737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2d936f5fb47d%3A0x347c9c1b1f344f72!2s1275%20Finch%20Ave%20W%2C%20North%20York%2C%20ON%20M3J%200L5%2C%20Canada!5e0!3m2!1sen!2sus!4v1695843700875!5m2!1sen!2sus"
            className="h-60 w-full rounded-lg border-0 shadow-lg sm:h-[300px] sm:w-[500px] lg:w-[400px]"
            allowFullScreen={false}
            loading="lazy"
          ></iframe>
        </div>

        <div className="mt-8 flex w-full flex-col items-center lg:mt-0 lg:w-1/3">
          <h2 className="py-4 text-xl font-bold uppercase text-black">
            GET IN TOUCH
          </h2>
          <ul className="text-md space-y-4 font-medium text-black">
            <li className="flex items-center space-x-2">
              <FaPhoneAlt className="text-lg" />
              <span className="w-full max-w-xs break-words">
                +1 (647) 468-0737
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <FaEnvelope className="text-lg" />
              <span className="w-full max-w-xs break-words">
                info@acornaccounting.com
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <FaClock className="text-lg" />
              <span>MON-FRI: 9AM-5PM</span>
            </li>
            <li className="flex items-start space-x-2">
              <FaMapMarkerAlt className="text-lg" />
              <span className="w-full max-w-xs break-words">
                1275 Finch Ave W Suite 815, North York, ON M3J 0L5
              </span>
            </li>
          </ul>
        </div>
      </footer>

      <div className="w-full bg-white py-4 text-center">
        <p className="text-sm text-gray-500">
          © {year} ACORN ACCOUNTING - All rights reserved
        </p>
      </div>
    </>
  );
};

export default Footer;
