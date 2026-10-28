"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  const router = useRouter();

  const [showDropdown, setShowDropdown] = useState(false);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get("/api/auth/me");

        setUserName(response.data.user.fullName);
        setUserEmail(response.data.user.email);
      } catch (error) {
        console.error(error);
      }
    };

    getCurrentUser();
  }, []);
  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/auth/logout");

      toast.success(response.data.message || "Logged out successfully");

      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <header
      className="
        sticky top-0 z-50
        w-full
        border-b border-slate-200/50
        px-2 sm:px-4 md:px-8
        py-4
      "
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, #FFFFFF 15%, #DEE7F5 85%)",
      }}
    >
      <div className="flex items-center justify-between">
        {/* Left Logo */}
        <div className="flex items-center gap-0.5">
          <Image
            src="/login/drishti-logo.png"
            alt="Drishti Logo"
            width={60}
            height={40}
            priority
            className="h-7 sm:h-8 md:h-9 lg:h-11 w-auto"
          />
          {/* <Image
            src="/login/iit-logo.png"
            alt="iit Logo"
            width={60}
            height={40}
            priority
            className="h-7 sm:h-8 md:h-9 lg:h-12 w-auto"
          /> */}
          <Image
            src="/login/aiims-bhopal.png"
            alt="AIIMS Bhopal Logo"
            width={60}
            height={40}
            priority
            className="h-7 sm:h-8 md:h-9 lg:h-12 w-auto"
          />
        </div>

        {/* Center Title */}
        <div className="hidden sm:flex flex-1 justify-center px-2 md:px-4 xl:absolute xl:left-1/2 xl:-translate-x-1/2">
          <h1 className="text-center text-xl font-semibold text-[#2B3674] lg:text-2xl">
            {/* Cancer Survivor Assessment */}
            PRATIGYA: The Pledge — Cancer QOL
          </h1>
        </div>

        {/* Mobile Title */}
        <div className="flex flex-1 justify-center px-1 sm:hidden">
          <h1 className="text-center text-lg  font-semibold text-[#2B3674]">
            {/* Cancer Survivor Assessment */}
            PRATIGYA: The Pledge — Cancer QOL
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="
                flex 
                items-center
                justify-center
              "
            >
              <FaUserCircle
                size={30}
                className="text-[#2B3674] hover:size={45] transition-all duration-300 hover:scale-110"
              />
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div
                className="
                  absolute right-0 mt-2
                  w-48 rounded-lg
                  border border-slate-200
                  bg-gray-100
                  p-3
                  shadow-lg
                  z-50
                "
              >
                <p className="mt-1 text-[14px] font-semibold text-slate-800 ">
                  Dr. {userName || "Doctor"}
                </p>
                <p className="text-[11px] font-normal text-slate-800 ">
                  {userEmail || "email"}
                </p>

                <button
                  onClick={handleLogout}
                  className="
                    mt-3 flex w-full items-center
                    gap-2 rounded-md px-2 py-2
                    text-sm text-red-600
                    hover:bg-red-50 sm:hidden
                  "
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Desktop Logout Button */}
          <button
            onClick={handleLogout}
            className="
              hidden sm:flex
              items-center gap-2
              rounded-md
              border border-[#A3AED0]
              bg-white
              px-3 py-2
              text-sm
              text-[#A3AED0]
              shadow-sm
              transition-all
              hover:border-[#2B3674]
              hover:text-[#2B3674]
            "
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
