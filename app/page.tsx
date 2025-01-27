import Card from "@/components/Card/Card";
import Greetings from "@/components/Greetings/Greetings";
import Profile from "@/components/Profile/Profile";
import Sidebar from "@/components/Sidebar/Sidebar";
import moment from "moment";
import { FaCalendarXmark } from "react-icons/fa6";
import { IoMdCalendar } from "react-icons/io";
import { IoPeopleOutline } from "react-icons/io5";
import { getUserData } from "./actions/getUserData";
import Header from "./components/Header/Header";

export default async function Home() {
  const user = await getUserData();
  const formattedDate = moment().format("DD.MM.YYYY");
  const formattedDateWithTime = moment().format("DD.MM.YYYY HH:mm:ss");

  const cardsData = [
    {
      title: "Clienți",
      numberOf: 1025,
      subText: "Număr total de clienți înregistrați în sistem.",
      icon: <IoPeopleOutline className="icon-style" />,
    },
    {
      title: "Programări totale",
      numberOf: 1025,
      subText: `Ultima actualizare: ${formattedDate}`,
      icon: <IoMdCalendar className="icon-style" />,
    },
    {
      title: "Programări neconfirmate",
      numberOf: 3,
      subText: `Ultima actualizare: ${formattedDateWithTime}`,
      icon: <FaCalendarXmark className="icon-style" />,
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 flex flex-col  bg-light-gray ">
        <div className="flex justify-between items-center pl-6 border-b-1 py-4">
          <Greetings name={user?.user_metadata.display_name} />
          <Profile user={user} />
        </div>
        <div>
          <Header />
          <section className="flex w-full justify-between mt-5 px-6 gap-10">
            {cardsData.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                numberOf={card.numberOf}
                subText={card.subText}
                icon={card.icon}
              />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
