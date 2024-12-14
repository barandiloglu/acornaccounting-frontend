"use client";

import AdminAuth from "@/components/AdminAuth"; // Correct import path for AdminAuth
import { useRouter } from "next/navigation"; // Import useRouter

const Admin = () => {
  const router = useRouter(); // Initialize router

  return (
    <AdminAuth>
      <div className="flex min-h-screen w-full bg-gray-50">
        {/* Sidebar */}
        <div className="flex min-h-screen w-[10%] items-start justify-center bg-[#C2272C] text-white">
          <ul className="flex list-none flex-col font-bold">
            <li>
              <button
                onClick={() => router.push("/admin/appointments")}
                className="w-full border-b-2 border-white px-12 py-8 uppercase transition-colors hover:bg-[#a42527]"
              >
                Appointments
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/admin/tax-cases")}
                className="w-full border-b-2 border-white px-12 py-8 uppercase transition-colors hover:bg-[#a42527]"
              >
                Tax Cases
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/admin/email-messaging")}
                className="w-full border-b-2 border-white px-12 py-8 uppercase transition-colors hover:bg-[#a42527]"
              >
                Email Messaging
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/admin/sms-messaging")}
                className="w-full border-b-2 border-white px-12 py-8 uppercase transition-colors hover:bg-[#a42527]"
              >
                SMS Messaging
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p>Welcome to the admin dashboard. Use the sidebar to navigate.</p>
        </div>
      </div>
    </AdminAuth>
  );
};

export default Admin;
