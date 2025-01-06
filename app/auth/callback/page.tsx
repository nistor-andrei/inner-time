"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const AuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");
    const errorDescription = urlParams.get("error_description");

    if (error) {
      // Afișează un mesaj specific pentru fiecare tip de eroare
      if (error === "otp_expired") {
        toast.error("Link-ul a expirat! Te rugăm să soliciți unul nou.");
      } else if (error === "access_denied") {
        toast.error("Acces refuzat. Te rugăm să încerci din nou.");
      } else {
        toast.error(`Eroare: ${errorDescription || "Necunoscută"}`);
      }
    } else {
      toast.success("Cont activat cu succes!");
      router.push("/"); // Redirecționează către pagina principală după activare
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-medium">Activarea contului</h2>
        <p>Procesul de activare a contului este în curs de desfășurare...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
