"use client";
import { signInAction } from "@/app/actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const SignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<SignForm>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await toast.promise(signInAction(formData), {
        loading: "Autentificare...",
        success: (response: {
          success: boolean;
          message: string | undefined;
        }) => {
          if (response.success) {
            return "Logat cu succes!";
          } else {
            throw new Error(response.message);
          }
        },
        error: (err: { message: string }) => {
          return err.message || "A apărut o eroare. Încercați din nou.";
        },
      });
      if (!response.success) {
        setErrorMessage(response.message ?? null);
      }
      router.push("/");
    } catch (error) {
      toast.error("A apărut o eroare. Încercați din nou.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-6">
          <Image src="/logo.jpg" alt="logo" width={100} height={100} priority />
        </div>
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
              aria-current
            />
          </div>
          {errorMessage && (
            <p className="text-red-600 text-center mb-4">{errorMessage}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLoading ? "Autentificare..." : "Login"}
          </button>
        </form>
        <p className="mt-5 text-center">
          Daca nu ai cont ?{" "}
          <Link href="/sign-up" className="text-primary">
            Înregistrează-te
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
