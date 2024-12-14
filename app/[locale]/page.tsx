"use client";

import Image from "next/image";
import { useState } from "react";

import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  const personalTaxReturns = [
    "Personal Tax Return (T1)",
    "Employee/Self Employed/Sole Proprietors/Investors",
    "Uber Income",
    "CRA Audit Assistance",
    "RRSP",
    "Capital Gain or Loss",
    "T1135 – Foreign asset and income reporting",
    "Non Resident Tax Filings",
    "Rental Property Income",
    "Tax Return Adjustment and Appeal",
  ];

  const corporateTaxReturns = [
    "Corporate Tax Return (T2)",
    "Tax Planning",
    "HST Filing",
    "CRA Audit Representation",
    "WSIB Reporting",
    "T4 & T5 Payroll Reporting",
    "Foreign Income",
    "Non Resident Tax Filings",
  ];

  const accountAndBookkeeping = [
    "CRA Audit Assistance",
    "Payroll",
    "Affordable Bookkeeping",
    "HST Processing",
  ];

  const [hoverKey, setHoverKey] = useState<string | null>(null);

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
        <div className="absolute inset-0 z-20 bg-black opacity-40"></div>

        <div className="relative z-30 flex min-h-[50vh] flex-col justify-center p-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-6xl">
            ACORN ACCOUNTING
          </h1>

          <div className="mt-10 flex flex-wrap space-x-8 text-white">
            <div className="text-center">
              <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-4xl">
                80+
              </h2>
              <p className="text-base sm:text-lg md:text-xl">CLIENT</p>
            </div>
            <div className="text-center">
              <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-4xl">
                170+
              </h2>
              <p className="text-base sm:text-lg md:text-xl">PROJECT</p>
            </div>
            <div className="text-center">
              <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-4xl">
                200+
              </h2>
              <p className="text-base sm:text-lg md:text-xl">PARTNER</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex max-w-[90rem] flex-col space-y-8 p-8 text-black lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex w-full flex-col space-y-4 md:w-2/3 lg:w-2/3 xl:w-2/3">
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
            aliquip ex ea commodo consequat.
          </p>
          <p className="text-xl">
            SLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden w-full md:flex md:w-1/3 lg:flex lg:w-1/3 xl:flex xl:w-1/3">
          <img
            src="/resources/corporate-tax-returns.png"
            alt="About Us"
            className="h-auto w-full rounded-md object-cover xl:h-[500px]"
          />
        </div>
      </div>

      <div className="flex w-full flex-col items-center p-8">
        <h2 className="mb-8 text-4xl font-bold text-black">
          SERVICES WE CAN HELP YOU WITH
        </h2>
        <div className="mb-8 w-16 border-t-4 border-red-700"></div>

        <div className="grid w-full max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            whileHover={{ scale: 1.05 }} // Scale up on hover
            className="relative flex flex-col rounded-lg border-2 border-[#C2272C] bg-[#C2272C] p-4 text-white"
            onMouseEnter={() => setHoverKey("personal-tax")}
            onMouseLeave={() => setHoverKey(null)}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-[#C2272C] bg-opacity-100 p-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <div className="max-w-[90%] space-y-4 text-center">
                <h3 className="text-3xl font-bold text-white">
                  PERSONAL TAX RETURNS
                </h3>

                <motion.div
                  className="space-y-2 text-lg font-semibold"
                  key={hoverKey === "personal-tax" ? "hovered" : "reset"}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {personalTaxReturns.map((item, index) => (
                    <motion.div
                      key={index}
                      className="text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ delay: index * 0.2, duration: 0.3 }}
                    >
                      {/* Line */}
                      <motion.div
                        className="my-2 h-0.5 w-full bg-white"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: index * 0.2, duration: 0.3 }}
                      ></motion.div>
                      {item}
                    </motion.div>
                  ))}
                  {/* Line after last item */}
                  <motion.div
                    className="my-2 h-0.5 w-full bg-white"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      delay: personalTaxReturns.length * 0.2,
                      duration: 0.3,
                    }}
                  ></motion.div>
                </motion.div>
              </div>
            </div>
            <h3 className="mb-4 text-2xl font-bold">PERSONAL TAX RETURNS</h3>
            <img
              src="/resources/personal-tax.png"
              alt="Personal Tax Returns"
              className="mb-4 h-1/2 rounded-md object-cover"
            />
            <p className="mb-4 flex-grow">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex justify-end">
              <FaArrowRight className="text-2xl" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative flex flex-col rounded-lg border-2 border-[#C2272C] bg-white p-4 text-black"
            onMouseEnter={() => setHoverKey("corporate-tax")}
            onMouseLeave={() => setHoverKey(null)}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-[#C2272C] bg-opacity-100 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <div className="max-w-[90%] space-y-4 text-center">
                <h3 className="text-3xl font-bold text-white">
                  CORPORATE TAX RETURNS
                </h3>

                <motion.div
                  className="space-y-2 text-lg font-semibold"
                  key={hoverKey === "corporate-tax" ? "hovered" : "reset"}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {corporateTaxReturns.map((item, index) => (
                    <motion.div
                      key={index}
                      className="text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ delay: index * 0.2, duration: 0.3 }}
                    >
                      {/* Line */}
                      <motion.div
                        className="my-2 h-0.5 w-full bg-white"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: index * 0.2, duration: 0.3 }}
                      ></motion.div>
                      {item}
                    </motion.div>
                  ))}
                  {/* Line after last item */}
                  <motion.div
                    className="my-2 h-0.5 w-full bg-white"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      delay: corporateTaxReturns.length * 0.2,
                      duration: 0.3,
                    }}
                  ></motion.div>
                </motion.div>
              </div>
            </div>

            <h3 className="mb-4 text-2xl font-bold">CORPORATE TAX RETURNS</h3>
            <img
              src="/resources/estate-taxes.png"
              alt="Corporate Tax Returns"
              className="mb-4 h-1/2 rounded-md object-cover"
            />
            <p className="mb-4 flex-grow">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex justify-end">
              <FaArrowRight className="text-2xl text-red-700" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative flex flex-col rounded-lg border-2 border-[#C2272C] bg-[#C2272C] p-4 text-white"
            onMouseEnter={() => setHoverKey("accounting")}
            onMouseLeave={() => setHoverKey(null)}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-[#C2272C] bg-opacity-100 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <div className="max-w-[90%] space-y-4 text-center">
                <h3 className="text-center text-3xl font-bold uppercase">
                  Accounting & Bookkeeping
                </h3>

                <p className="text-base text-white">
                  Keeping track of all your business financial transactions such
                  as purchases, sales, invoices, and payments can be
                  challenging. Our bookkeeping professional can help you keep
                  everything in order so that you can relax and focus on growing
                  your business.
                </p>

                <motion.div
                  className="space-y-2 text-lg font-semibold"
                  key={hoverKey === "accounting" ? "hovered" : "reset"}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {accountAndBookkeeping.map((item, index) => (
                    <motion.div
                      key={index}
                      className="text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ delay: index * 0.2, duration: 0.3 }}
                    >
                      {/* Line */}
                      <motion.div
                        className="my-2 h-0.5 w-full bg-white"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: index * 0.2, duration: 0.3 }}
                      ></motion.div>
                      {item}
                    </motion.div>
                  ))}
                  {/* Line after last item */}
                  <motion.div
                    className="my-2 h-0.5 w-full bg-white"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      delay: accountAndBookkeeping.length * 0.2,
                      duration: 0.3,
                    }}
                  ></motion.div>
                </motion.div>
              </div>
            </div>

            <h3 className="mb-4 text-2xl font-bold uppercase">
              Accounting & Bookkeeping
            </h3>
            <img
              src="/resources/consulting.png"
              alt="Accounting"
              className="mb-4 h-1/2 rounded-md object-cover"
            />
            <p className="mb-4 flex-grow">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex justify-end">
              <FaArrowRight className="text-2xl" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex min-h-[20vh] w-full flex-row items-center justify-around bg-[#C2272C] py-8">
        <div className="flex flex-col items-center text-white">
          <h2 className="text-4xl font-bold md:text-5xl lg:text-5xl xl:text-5xl">
            500+
          </h2>
          <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
            Clients Served
          </p>
        </div>

        <div className="flex flex-col items-center text-white">
          <h2 className="text-4xl font-bold md:text-5xl lg:text-5xl xl:text-5xl">
            200+
          </h2>
          <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
            Consultations Provided
          </p>
        </div>

        <div className="flex flex-col items-center text-white">
          <h2 className="text-4xl font-bold md:text-5xl lg:text-5xl xl:text-5xl">
            10+
          </h2>
          <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
            Years Experience
          </p>
        </div>
      </div>
    </main>
  );
}
