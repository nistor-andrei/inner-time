"use client";

import { signOut } from "@/app/actions/auth/action";
import { useState } from "react";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { ClipLoader } from "react-spinners";

const ProfileDropdown = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="absolute right-6 top-[4rem] w-48 bg-white shadow-lg rounded-lg p-2">
      <button
        className="flex items-center gap-2 w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        onClick={() => alert("Navigating to Profile...")}
      >
        <FaUserAlt size={16} />
        Profilul meu
      </button>
      <button
        className="flex items-center gap-2 w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        onClick={() => alert("Editing Profile...")}
      >
        <IoIosSettings size={16} />
        Editeză profilul
      </button>
      <button
        className="flex items-center gap-2 w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? (
          <ClipLoader size={16} color="#4B5563" />
        ) : (
          <FaSignOutAlt size={16} />
        )}
        {isLoggingOut ? "Se procesează..." : "Deloghează-te"}
      </button>
    </div>
  );
};

export default ProfileDropdown;
