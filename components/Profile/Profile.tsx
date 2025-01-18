"use client";

import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import ProfileDropdown from "./components/ProfileDropdown/ProfileDropdown";
import ProfileImage from "./components/ProfileImage/ProfileImage";

const Profile = ({ user }: { user: User | null }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex items-center justify-end  w-full max-w-md  relative">
      <div className="flex items-center gap-3">
        <ProfileImage
          avatarUrl={user?.user_metadata?.avatar_url}
          altText="Profile"
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
      {dropdownOpen && <ProfileDropdown />}
    </div>
  );
};

export default Profile;
