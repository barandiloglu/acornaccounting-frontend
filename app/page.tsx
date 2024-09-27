"use client";

import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-white">
      <div
        className="relative flex min-h-[50vh] w-full flex-col text-sm"
        style={{
          backgroundImage: "url(/resources/accounting-banner.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for text */}
        <div className="absolute inset-0 z-20 bg-black opacity-40"></div>

        {/* Text content */}
        <div className="relative z-30 flex min-h-[50vh] flex-col justify-center p-8">
          <h1 className="text-6xl font-bold text-white">
            CANADIAN TAX SERVICES
          </h1>

          <div className="mt-10 flex space-x-8 text-white">
            <div className="text-center">
              <h2 className="text-4xl font-bold">80+</h2>
              <p>CLIENT</p>
            </div>
            <div className="text-center">
              <h2 className="text-4xl font-bold">170+</h2>
              <p>PROJECT</p>
            </div>
            <div className="text-center">
              <h2 className="text-4xl font-bold">200+</h2>
              <p>PARTNER</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex max-w-[90rem] flex-col items-center justify-center space-y-8 p-8 text-black lg:flex-row lg:space-x-12 lg:space-y-0">
        {/* Text Section */}
        <div className="flex w-full flex-col space-y-4 lg:w-1/2">
          <h1 className="text-3xl font-bold">About Us</h1>
          <p className="text-xl">
            SLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. SLorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
          <p className="text-xl">
            SLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. SLorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex w-full lg:w-1/3">
          <img
            src="/resources/corporate-tax-returns.png"
            alt="About Us"
            className="h-auto w-full rounded-md object-cover xl:h-[500px]"
          />
        </div>
      </div>

      <div className="flex w-full flex-col items-center p-8">
        {/* Section Title */}
        <h2 className="mb-8 text-4xl font-bold text-black">
          SERVICES WE CAN HELP YOU WITH
        </h2>
        <div className="mb-8 w-16 border-t-4 border-red-700"></div>

        <div className="grid w-full max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }} // Scale up on hover
            className="relative flex flex-col rounded-lg border-2 border-[#C2272C] bg-[#C2272C] p-4 text-white"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-[#C2272C] bg-opacity-90 p-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <h3 className="max-w-[90%] text-center text-3xl font-bold">
                PERSONAL TAX RETURNS
              </h3>
            </div>
            <h3 className="mb-4 text-2xl font-bold">PERSONAL TAX RETURNS</h3>
            <img
              src="/resources/personal-tax.png"
              alt="Personal Tax Returns"
              className="mb-4 h-1/2 rounded-md object-cover"
            />
            <p className="mb-4 flex-grow">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="flex justify-end">
              <FaArrowRight className="text-2xl" />
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative flex flex-col rounded-lg border-2 border-[#C2272C] bg-white p-4 text-black"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-[#C2272C] bg-opacity-90 p-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <h3 className="max-w-[90%] text-3xl font-bold text-white">
                ACCOUNTING
              </h3>
            </div>
            <h3 className="mb-4 text-2xl font-bold">ACCOUNTING</h3>
            <img
              src="/resources/accounting.png"
              alt="Accounting"
              className="mb-4 h-1/2 rounded-md object-cover"
            />
            <p className="mb-4 flex-grow">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="flex justify-end">
              <FaArrowRight className="text-2xl text-red-700" />
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative flex flex-col rounded-lg border-2 border-[#C2272C] bg-[#C2272C] p-4 text-white"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-[#C2272C] bg-opacity-90 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <h3 className="max-w-[90%] text-center text-3xl font-bold">
                CORPORATE TAX RETURNS
              </h3>
            </div>
            <h3 className="mb-4 text-2xl font-bold">CORPORATE TAX RETURNS</h3>
            <img
              src="/resources/corporate-tax-returns.png"
              alt="Corporate Tax Returns"
              className="mb-4 h-1/2 rounded-md object-cover"
            />
            <p className="mb-4 flex-grow">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="flex justify-end">
              <FaArrowRight className="text-2xl" />
            </div>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative flex flex-col rounded-lg border-2 border-[#C2272C] bg-white p-4 text-black"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-[#C2272C] bg-opacity-90 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <h3 className="max-w-[90%] text-center text-3xl font-bold text-white">
                CONSULTING
              </h3>
            </div>
            <h3 className="mb-4 text-2xl font-bold">CONSULTING</h3>
            <img
              src="/resources/consulting.png"
              alt="Consulting"
              className="mb-4 h-1/2 rounded-md object-cover"
            />
            <p className="mb-4 flex-grow">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="flex justify-end">
              <FaArrowRight className="text-2xl text-red-700" />
            </div>
          </motion.div>

          {/* Card 5 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative flex flex-col rounded-lg border-2 border-[#C2272C] bg-[#C2272C] p-4 text-white"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-[#C2272C] bg-opacity-90 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <h3 className="max-w-[90%] text-center text-3xl font-bold">
                FINANCIAL STATEMENTS
              </h3>
            </div>
            <h3 className="mb-4 text-2xl font-bold">FINANCIAL STATEMENTS</h3>
            <img
              src="/resources/financial-statements.png"
              alt="Financial Statements"
              className="mb-4 h-1/2 rounded-md object-cover"
            />
            <p className="mb-4 flex-grow">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="flex justify-end">
              <FaArrowRight className="text-2xl" />
            </div>
          </motion.div>

          {/* Card 6 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative flex flex-col rounded-lg border-2 border-[#C2272C] bg-white p-4 text-black"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-[#C2272C] bg-opacity-90 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <h3 className="max-w-[90%] text-center text-3xl font-bold text-white">
                ESTATE TAXES
              </h3>
            </div>
            <h3 className="mb-4 text-2xl font-bold">ESTATE TAXES</h3>
            <img
              src="/resources/estate-taxes.png"
              alt="Estate Taxes"
              className="mb-4 h-1/2 rounded-md object-cover"
            />
            <p className="mb-4 flex-grow">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="flex justify-end">
              <FaArrowRight className="text-2xl text-red-700" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex min-h-[20vh] w-full flex-row items-center justify-around bg-[#C2272C] py-8">
        {/* Clients Served */}
        <div className="flex flex-col items-center text-white">
          <h2 className="text-5xl font-bold">500+</h2>
          <p className="mt-2 text-lg">Clients Served</p>
        </div>

        {/* Consultations Provided */}
        <div className="flex flex-col items-center text-white">
          <h2 className="text-5xl font-bold">200+</h2>
          <p className="mt-2 text-lg">Consultations Provided</p>
        </div>

        {/* Years Experience */}
        <div className="flex flex-col items-center text-white">
          <h2 className="text-5xl font-bold">10+</h2>
          <p className="mt-2 text-lg">Years Experience</p>
        </div>
      </div>
    </main>
  );
}
