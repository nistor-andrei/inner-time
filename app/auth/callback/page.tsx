"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const timeout = setTimeout(() => {
        toast.error("Autentificarea a durat prea mult. Te rugăm să încerci din nou.");
        router.push("/sign-in");
      }, 10000); // 10 seconds timeout

      try {
        const supabase = createClient();
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session) {
          toast.error("Autentificarea a eșuat");
          router.push("/sign-in");
          return;
        }

        toast.success("Autentificare reușită!");
        router.push("/");
      } catch (_) {
        toast.error("A apărut o eroare neașteptată");
        router.push("/sign-in");
      } finally {
        clearTimeout(timeout);
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Se procesează autentificarea...</p>
      </div>
    </div>
  );
}
