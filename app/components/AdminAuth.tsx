"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import axios from "axios";

const AdminAuth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await axios.get("/api/admin/check-auth", {
          withCredentials: true, // Include cookies
        });

        if (response.data.role === "admin") {
          setIsAuthorized(true);
        } else {
          router.push("/not-authorized"); // Redirect if not admin
        }
      } catch (error) {
        router.push("/login"); // Redirect to login if not authenticated
      } finally {
        setIsLoading(false); // Stop loading state
      }
    };

    checkAuthorization();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
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
    );
  }

  if (!isAuthorized) {
    return null; // Prevent unauthorized users from seeing the page
  }

  return <>{children}</>;
};

export default AdminAuth;
