import Link from "next/link";
import { ReactElement } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import "./Card.css";

interface CardProps {
  title: string;
  numberOf: number;
  icon: ReactElement;
  subText: string;
}

const Card = ({ title, numberOf, icon, subText }: CardProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between min-h-32 max-h-full  w-full max-w-sm sm:max-w-md mx-auto">
      <div className="flex items-center justify-between w-full">
        <div className="flex text-3xl  items-center">
          {icon}
          <h3 className="text-gray-500 text-lg ml-2 font-semibold">{title}</h3>
        </div>
        <Link href="/details" className="border-1 rounded-full p-1">
          <MdOutlineArrowOutward className="text-primary" />
        </Link>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-gray-900 mb-2">{numberOf}</p>
        <p className="text-sm text-gray-500">{subText}</p>
      </div>
    </div>
  );
};

export default Card;
