import { FC } from "react";
import { FaCloudSun, FaMoon, FaSun } from "react-icons/fa";

interface GreetingsProps {
  name: string;
}

const Greetings: FC<GreetingsProps> = ({ name }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return {
        text: "Bună dimineața",
        icon: <FaSun className="text-yellow-500" />,
      };
    } else if (hour < 18) {
      return {
        text: "Bună ziua",
        icon: <FaCloudSun className="text-orange-400" />,
      };
    } else {
      return {
        text: "Seara faină",
        icon: <FaMoon className="text-blue-500" />,
      };
    }
  };

  const { text, icon } = getGreeting();

  return (
    <div className="flex items-center">
      <div className="text-2xl mr-2">{icon}</div>
      <div className="text-lg font-semibold">
        {text}, <span className="text-primary">{name}</span>!
      </div>
    </div>
  );
};

export default Greetings;
