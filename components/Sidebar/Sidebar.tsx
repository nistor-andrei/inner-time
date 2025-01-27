"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ElementType, useState } from "react";
import { AiOutlineTeam } from "react-icons/ai";
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
        "h-screen  bg-white text-black border-e flex flex-col",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-17" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="px-4 py-[13.1px] flex items-center border-b-1">
        <Image
          src="/logo-bg.png"
          alt="logo"
          width={50}
          height={50}
          className="min-w-[50px]"
        />
        {!isCollapsed && (
          <h2 className="font-semibold ml-2 text-lg">Inner time</h2>
        )}
      </div>

      <ul className="space-y-4 p-4 overflow-y-auto flex-1">
        {sidebarPath.map(({ icon, text, link }) => {
          const IconComponent = iconMap[icon];
          return (
            <li
              key={link}
              className={clsx(
                "p-2 cursor-pointer flex items-center gap-3 rounded-md",
                pathname === link && "bg-white border border-gray-300",
                isCollapsed && "justify-center"
              )}
            >
              <IconComponent
                className={clsx(
                  "text-2xl",
                  pathname === link && "text-primary"
                )}
              />
              {!isCollapsed && (
                <Link
                  href={link}
                  className={clsx(
                    "text-lg",
                    pathname === link && "text-primary"
                  )}
                >
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
          "p-4 text-3xl  border-t bg-white",
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
