"use client";
import { useState, FormEvent, use } from "react";
import { signUpAction } from "@/app/actions";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [isEmailSent, setIsEmailSent] = useState(false); // State pentru a verifica dacă e-mailul a fost trimis
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter your mail address"
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-2">
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

            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Parolă
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter password"
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Încă se înregistrează..." : "Creează cont"}
            </button>
          </form>
        )}

        {!isEmailSent && (
          <p className="mt-4 text-center text-sm text-gray-600">
            Daca ai cont ?{" "}
            <Link href="/sign-in" className="text-primary hover:underline">
              Logheză-te
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
