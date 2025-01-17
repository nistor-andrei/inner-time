import Profile from "@/components/Profile/Profile";
import Sidebar from "@/components/Sidebar/Sidebar";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 flex flex-col gap-6 ml-6">
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-3xl p-4">Panou</h2>
          <Profile user={user} />
        </div>
      </main>
    </div>
  );
}
