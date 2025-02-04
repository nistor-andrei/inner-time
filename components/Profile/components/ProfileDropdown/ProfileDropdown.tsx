import { signOutAction } from "@/app/actions";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

const ProfileDropdown = () => {
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
        className="flex items-center gap-2 w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        onClick={signOutAction}
      >
        <FaSignOutAlt size={16} />
        Deloghează-te
      </button>
    </div>
  );
};

export default ProfileDropdown;
