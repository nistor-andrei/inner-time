"use client";
import { useState, FormEvent } from "react";
import { signUpAction } from "@/app/actions";
import Link from "next/link";
import Image from "next/image";

const SignUp = () => {
  const [isEmailSent, setIsEmailSent] = useState(false); // State pentru a verifica dacă e-mailul a fost trimis
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<SignForm>) => {
    e.preventDefault();
    setIsLoading(true); // Se pornește starea de încărcare
    setErrorMessage(null); // Resetăm mesajul de eroare înainte de a trimite

    const formData = new FormData(e.currentTarget);

    try {
      const response = await signUpAction(formData);

      if (response.success) {
        setIsEmailSent(true); // Setează starea ca fiind email trimis
      } else {
        setErrorMessage(response.message); // Setează mesajul de eroare
      }
    } catch (error: any) {
      console.error("Eroare la înregistrare: ", error);
      setErrorMessage("A apărut o problemă la înregistrare.");
    } finally {
      setIsLoading(false); // Se oprește starea de încărcare
    }
  };

  console.log(isEmailSent);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-6">
          <Image src="/logo.jpg" alt="logo" width={100} height={100} />
        </div>

        {isEmailSent ? (
          <p className="mt-4 text-center text-green-600">
            Verifică-ți e-mailul pentru a confirma activarea contului!
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nume Complet
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Parolă
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {errorMessage && (
              <p className="text-red-600 text-center mb-4">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading} // Dezactivează butonul dacă este în încărcare
            >
              {isLoading ? "Încă se înregistrează..." : "Creează cont"}
            </button>
          </form>
        )}

        {!isEmailSent && (
          <p className="mt-5 text-center">
            Daca ai cont ?{" "}
            <Link href="/sign-in" className="text-primary">
              Logheză-te
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
