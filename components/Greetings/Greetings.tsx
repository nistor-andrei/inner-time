import { FC } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { PiSunHorizonBold } from "react-icons/pi";

interface GreetingsProps {
  name: string;
}

const Greetings: FC<GreetingsProps> = ({ name }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return {
        text: "Bună dimineața",
        icon: <PiSunHorizonBold className="text-yellow-400" />,
      };
    } else if (hour < 18) {
      return {
        text: "Bună ziua",
        icon: <FaSun className="text-yellow-500" />,
      };
    } else {
      return {
        text: "Seara faină",
        icon: <FaMoon className="text-blue-700" />,
      };
    }
  };

  const { text, icon } = getGreeting();

  return (
    <div className="flex items-center">
      <div className="text-2xl mr-2">{icon}</div>
      <div className="text-xl ">
        {text}, <span>{name}</span>!
      </div>
    </div>
  );
};

export default Greetings;
