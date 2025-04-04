"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ElementType, useState } from "react";
import { AiOutlineTeam } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";
import { sidebarPath } from "./utils";

const iconMap: Record<string, ElementType> = {
  RxDashboard: RxDashboard,
  RiCalendarScheduleLine: RiCalendarScheduleLine,
  AiOutlineTeam: AiOutlineTeam,
  IoMdSettings: IoMdSettings,
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={clsx(
        "h-screen  bg-light-gray text-black  flex flex-col",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-17" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="px-4 py-[13.1px] flex items-center ">
        <Image
          src="/logo-bg.png"
          alt="logo"
          width={50}
          height={50}
          className="min-w-[50px]"
        />
        {!isCollapsed && (
          <h2 className="font-semibold ml-2 text-lg text-darker-gray">
            Inner time
          </h2>
        )}
      </div>

      <ul className="space-y-6 p-4 overflow-y-auto flex-1">
        {sidebarPath.map(({ icon, text, link }) => {
          const IconComponent = iconMap[icon];
          return (
            <li
              key={link}
              className={clsx(
                "p-2 cursor-pointer flex items-center gap-3 rounded-md text-darker-gray",
                pathname === link && "bg-secondary ",
                isCollapsed && "justify-center"
              )}
            >
              <IconComponent className={clsx("text-3xl")} />
              {!isCollapsed && (
                <Link href={link} className={clsx("text-lg")}>
                  {text}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={clsx(
          "p-4 text-3xl  border-t bg-light-gray text-darker-gray",
          isCollapsed && "flex justify-center"
        )}
      >
        {isCollapsed ? (
          <TbLayoutSidebarRightCollapse />
        ) : (
          <TbLayoutSidebarLeftCollapse />
        )}
      </button>
    </aside>
  );
};

export default Sidebar;
