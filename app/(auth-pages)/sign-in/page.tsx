"use client";
import { signInAction } from "@/app/actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent<SignForm>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setIsLoading(true);

    try {
      await toast.promise(signInAction(formData), {
        loading: "Autentificare...",
        success: (response: {
          success: boolean;
          message: string | undefined;
        }) => {
          if (response.success) {
            router.push("/");
            return "Logat cu succes!";
          } else {
            throw new Error(response.message);
          }
        },
        error: (err: { message: string }) => {
          return err.message || "A apărut o eroare. Încercați din nou.";
        },
      });
    } catch (error) {
      toast.error("A apărut o eroare. Încercați din nou.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full">
        {/* Right Section: Image */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-blue-600 items-center justify-center">
          <img
            src="/man-puzzle.jpg"
            alt="Graphic"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Left Section: Login Form */}
        <div className="w-full lg:w-1/2 px-8 py-6">
          {/* Logo and Welcome Message */}
          <div className="text-center mb-8">
            <div className="flex justify-center  ">
              <Image src={"/logo.jpg"} alt="Logo" width={100} height={100} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Bine ai revenit!
            </h1>
            <p className="text-sm text-gray-600 mb-2">
              Accesează programările și gestionează sesiunile de terapie sau
              coaching.
            </p>
          </div>
          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
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
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Parolă
              </label>
              <div className="relative">
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
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="ml-2">Ține-mă minte</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Ai uitat parola?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white rounded-lg shadow-sm bg-primary disabled:opacity-50"
              disabled={isLoading}
            >
              Intră în cont
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Nu ai cont ?{" "}
            <Link href="/sign-up" className="text-blue-600 hover:underline">
              Înregistrează-te
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
