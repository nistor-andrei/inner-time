"use client";
import { signInWithGoogle } from "@/app/actions/auth/action";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);



  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await toast.promise(signInWithGoogle(), {
        loading: "Se procesează autentificarea...",
        success: () => {
          return "Redirecționare către Google...";
        },
        error: (err: { message: string }) => {
          return err.message || "A apărut o eroare la autentificare. Te rugăm să încerci din nou.";
        },
      });
    } catch (_) {
      toast.error("A apărut o eroare neașteptată. Te rugăm să încerci din nou.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
      <div className="w-full max-w-5xl aspect-[16/9] flex bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Right Section: Image */}
        <div className="hidden lg:block w-[45%] relative">
          <div className="absolute inset-0 bg-blue-600/10 z-10" />
          <Image
            src="/man-puzzle.jpg"
            alt="Graphic"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            objectFit="cover"
            objectPosition="center"
            quality={90}
          />
        </div>
        {/* Left Section: Login Form */}
        <div className="w-full lg:w-[55%] p-8 md:p-12 flex flex-col justify-center">
          {/* Logo and Welcome Message */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Image src="/logo-bg.png" alt="Logo" width={80} height={80} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              Bine ai revenit!
            </h1>
            <p className="text-gray-600 text-base max-w-md mx-auto leading-relaxed">
              Accesează programările și gestionează sesiunile de terapie sau
              coaching într-un mod simplu și organizat.
            </p>
          </div>

          {/* Google Sign In Button */}
          <div className="w-full max-w-sm mx-auto">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium border border-gray-200 px-5 py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <ClipLoader size={18} color="#4B5563" />
              ) : (
                <Image
                  src="/google-icon.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
              )}
              <span className="text-base">
                {isLoading ? "Se procesează..." : "Continuă cu Google"}
              </span>
            </button>
          </div>

          {/* Footer Message */}
          <p className="text-center text-gray-500 text-sm mt-8">
            Platforma ta pentru gestionarea ședințelor de terapie într-un mod organizat și eficient.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
