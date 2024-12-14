"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { useTranslations } from "next-intl";

interface MobileNavbarProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const MobileNavbar = ({ isOpen, setOpen }: MobileNavbarProps) => {
  const t = useTranslations("navbar");

  // Track if the component has mounted
  const [isMounted, setIsMounted] = useState(false);

  // Ensure animations only run after the component is mounted on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2, // Staggering the appearance of children
      },
    },
    closed: {
      y: "-100%",
      opacity: 0,
      transition: { duration: 0.5, when: "afterChildren" },
    },
  };

  const itemVariants = {
    open: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    closed: { y: 20, opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    isMounted && (
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={containerVariants}
        className="fixed left-0 top-0 z-40 h-screen w-full bg-[#C2272C] text-white"
      >
        <motion.div className="flex h-full flex-col items-center justify-center space-y-10">
          <motion.div variants={itemVariants}>
            <Link href="/" onClick={() => setOpen(false)}>
              <motion.h2
                className="text-2xl font-bold"
                whileHover={{
                  scale: 1.2, // Slight scaling effect
                  rotate: 3, // Subtle rotation
                  color: "#FFD700", // Change text color
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {t("navbarHome")}
              </motion.h2>
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/about" onClick={() => setOpen(false)}>
              <motion.h2
                className="text-2xl font-bold"
                whileHover={{
                  scale: 1.2,
                  rotate: -3,
                  color: "#FFD700",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {t("navbarAbout")}
              </motion.h2>
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/services" onClick={() => setOpen(false)}>
              <motion.h2
                className="text-2xl font-bold"
                whileHover={{
                  scale: 1.2,
                  rotate: 3,
                  color: "#FFD700",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {t("navbarServices")}
              </motion.h2>
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/appointment" onClick={() => setOpen(false)}>
              <motion.h2
                className="text-2xl font-bold uppercase"
                whileHover={{
                  scale: 1.2,
                  rotate: -3,
                  color: "#FFD700",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {t("navbarAppointment")}
              </motion.h2>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    )
  );
};

export default MobileNavbar;
