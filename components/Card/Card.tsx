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
    <div className="bg-white rounded-lg p-6  shadow-md transition-shadow w-8/12">
      <div className="flex items-center justify-between mb-4">
        <div className="flex text-3xl  items-center">
          {icon}
          <h3 className="text-black text-sm ml-1">{title}</h3>
        </div>
        <Link href="/details" className="border-1 rounded-full p-1">
          <MdOutlineArrowOutward className="text-primary" />
        </Link>
      </div>
      <div className="mt-4">
        <p className="text-4xl font-semibold text-black">{numberOf}</p>
        <p className="text-sm text-mid-gray">{subText}</p>
      </div>
    </div>
  );
};

export default Card;
