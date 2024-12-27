"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import nookies from "nookies";

const AdminAuth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        // Retrieve the token from cookies
        const cookies = nookies.get();
        const token = cookies.token;

        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(
          "http://localhost:9090/api/admin/check-auth",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token from cookies
            },
            withCredentials: true, // Include credentials (cookies)
          },
        );

        if (response.data.role === "admin") {
          setIsAuthorized(true);
        } else {
          router.push("/"); // Redirect non-admin users
        }
      } catch (error) {
        console.error("Authorization check failed", error);
        router.push("/login"); // Redirect unauthenticated users to login
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
