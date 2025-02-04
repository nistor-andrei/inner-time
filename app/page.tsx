import Card from "@/components/Card/Card";
import Profile from "@/components/Profile/Profile";
import Sidebar from "@/components/Sidebar/Sidebar";
import moment from "moment";
import { IoPeopleOutline } from "react-icons/io5";
import { RiCalendarCloseLine, RiCalendarEventLine } from "react-icons/ri";
import { getUserData } from "./actions/getUserData";
import AppointmentsTable from "./components/AppointmentsTable/AppointmentsTable";
import StyledCalendar from "./components/Calendar/Calendar";
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
      icon: <RiCalendarEventLine className="icon-style" />,
    },
    {
      title: "Programări neconfirmate",
      numberOf: 3,
      subText: `Ultima actualizare: ${formattedDateWithTime}`,
      icon: <RiCalendarCloseLine className="icon-style " />,
    },
  ];

  const appointments = ["31/01/2025", "21/02/2025", "20/02/2025", "23/02/2025"];

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 flex flex-col   ">
        <div className="flex justify-between items-center pl-6 py-4">
          <Header />
          <Profile user={user} />
        </div>
        <div>
          <section className="flex  mt-5 px-6 flex-col">
            <div className="flex gap-5 mb-5 ">
              {cardsData.map((card, index) => (
                <Card
                  key={index}
                  title={card.title}
                  numberOf={card.numberOf}
                  subText={card.subText}
                  icon={card.icon}
                />
              ))}
            </div>
            <div className="flex gap-5">
              <AppointmentsTable />
              <StyledCalendar appointments={appointments} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
