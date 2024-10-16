"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface MobileNavbarProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const MobileNavbar = ({ isOpen, setOpen }: MobileNavbarProps) => {
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
    <motion.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={containerVariants}
      className="fixed left-0 top-0 z-40 h-screen w-full bg-[#C2272C] text-white"
    >
      <motion.div className="flex h-full flex-col items-center justify-center space-y-10">
        <motion.div variants={itemVariants}>
          <Link href="/" onClick={() => setOpen(false)}>
            <h2 className="text-2xl font-bold">HOME</h2>
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link href="/about" onClick={() => setOpen(false)}>
            <h2 className="text-2xl font-bold">ABOUT</h2>
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link href="/services" onClick={() => setOpen(false)}>
            <h2 className="text-2xl font-bold">SERVICES</h2>
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link href="/appointment" onClick={() => setOpen(false)}>
            <h2 className="text-2xl font-bold">SCHEDULE AN APPOINTMENT</h2>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MobileNavbar;
