"use client";

import { signOutAction } from "@/app/actions";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useState } from "react";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const Profile = ({ user }: { user: User | null }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    signOutAction();
  };

  return (
    <div className="flex items-center justify-end p-4 bg-white w-full max-w-md cursor-pointer relative">
      <div className="flex items-center gap-3">
        <Image
          src={user?.user_metadata?.avatar_url || "/profile.png"}
          alt="Profile"
          width={10}
          height={10}
          className="w-10 h-10 rounded-full object-cover border"
        />

        <div>
          <p className="font-medium text-gray-900" suppressHydrationWarning>
            {user?.user_metadata?.display_name || ""}
          </p>
          <p className="text-sm text-gray-600" suppressHydrationWarning>
            {user?.email || ""}
          </p>
        </div>
      </div>

      <button
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        {dropdownOpen ? <IoChevronUp /> : <IoChevronDown />}
      </button>

      {dropdownOpen && (
        <div className="absolute right-6 top-20 w-48 bg-white shadow-lg rounded-lg p-2">
          <button
            className="flex items-center gap-2 w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => alert("Navigating to Profile...")} // Replace with actual navigation
          >
            <FaUserAlt size={16} />
            Profilul meu
          </button>
          <button className="flex items-center gap-2 w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <IoIosSettings size={16} />
            Editeză profilul
          </button>
          <button
            className="flex items-center gap-2 w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={handleLogout}
          >
            <FaSignOutAlt size={16} />
            Deloghează-te
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
