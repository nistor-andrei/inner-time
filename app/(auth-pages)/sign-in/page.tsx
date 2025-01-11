"use client";
import { signInAction } from "@/app/actions";
import AuthBox from "@/components/AuthBox/AuthBox";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { SignForm } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const SignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
    } catch {
      toast.error("A apărut o eroare. Încercați din nou.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthBox>
      {/* Right Section: Image */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-blue-600 items-center justify-center">
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
      <div className="w-full lg:w-1/2 px-8 py-10">
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
        <form onSubmit={handleSubmit}>
          <Input
            labelText="Email"
            placeHolderText="Introdu adresa de email"
            name="email"
            type="email"
          />
          <Input
            labelText="Parolă"
            placeHolderText="Introdu parola"
            name="password"
            isPassword={true}
          />
          <div className="flex items-center justify-between">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Ai uitat parola?
            </Link>
          </div>
          <Button
            text={"Intră în cont"}
            isLoading={isLoading}
            type="submit"
            className="mt-6"
          />
        </form>

        {/* Register Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Nu ai cont ?{" "}
          <Link href="/sign-up" className="text-blue-600 hover:underline">
            Înregistrează-te
          </Link>
        </p>
      </div>
    </AuthBox>
  );
};

export default SignIn;
