"use client";
import { sidebarPath } from "@/utils/utils";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ElementType } from "react";
import { AiOutlineTeam } from "react-icons/ai";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";

const iconMap: Record<string, ElementType> = {
  RxDashboard: RxDashboard,
  RiCalendarScheduleLine: RiCalendarScheduleLine,
  AiOutlineTeam: AiOutlineTeam,
};

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 bg-light-gray text-black border-e">
      <ul className="space-y-4 p-6">
        <li className="text-2xl flex items-center">
          <Image src="/logo.jpg" alt="logo" width={50} height={50} />
          <h2 className="font-semibold">Inner time</h2>
        </li>
        {sidebarPath.map(({ icon, text, link }) => {
          const IconComponent = iconMap[icon];
          return (
            <li
              key={link}
              className={clsx(
                "p-2 cursor-pointer flex items-center gap-3 rounded-md",
                pathname === link && "bg-white border border-gray-300"
              )}
            >
              <IconComponent
                className={clsx(
                  "text-2xl",
                  pathname === link && "text-primary"
                )}
              />
              <Link
                href={link}
                className={clsx("text-lg", pathname === link && "text-primary")}
              >
                {text}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
