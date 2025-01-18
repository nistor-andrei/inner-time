import Greetings from "@/components/Greetings/Greetings";
import Profile from "@/components/Profile/Profile";
import Sidebar from "@/components/Sidebar/Sidebar";
import { getUserData } from "./actions/getUserData";
import Header from "./components/Header/Header";

export default async function Home() {
  const user = await getUserData();

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 flex flex-col  bg-slate-50 ">
        <div className="flex justify-between items-center pl-6 border-b-1 py-4">
          <Greetings name={user?.user_metadata.display_name} />
          <Profile user={user} />
        </div>
        <div>
          <Header />
        </div>
      </main>
    </div>
  );
}
