"use client";
import { signUpAction } from "@/app/actions";
import AuthBox from "@/components/AuthBox/AuthBox";
import Button from "@/components/Button/Button";
import HeaderAuth from "@/components/HeaderAuth/HeaderAuth";
import Input from "@/components/Input/Input";
import { SignForm } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const SignUp = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<SignForm>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await signUpAction(formData);

      if (response.success) {
        setIsEmailSent(true);
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("A apărut o problemă la înregistrare.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthBox>
      {/* Right Section: Image */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-blue-600 items-center justify-center">
        <Image
          src="/register-img.jpg"
          alt="Graphic"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          objectFit="cover"
          objectPosition="center"
          quality={90}
        />
      </div>
      {/* Left Section: Form */}
      <div className="w-full lg:w-1/2 px-8 py-10">
        <div className="mb-4 flex justify-center flex-col items-center">
          <HeaderAuth
            primaryText="Înregistrare"
            secondaryText="Creează-ți contul acum"
          />
        </div>
        {isEmailSent ? (
          <p className="mt-4 text-center text-green-600">
            Verifică-ți e-mailul pentru a confirma activarea contului!
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <Input
              labelText="Email"
              placeHolderText="Adaugă adresa de email"
              name="email"
            />
            <Input
              labelText="Nume complet"
              name="completName"
              placeHolderText="Introdu numele complet"
            />
            <Input
              labelText="Parolă"
              placeHolderText="Introdu parola"
              name="password"
              isPassword={true}
            />
            <Button text="Creează cont" isLoading={isLoading} type="submit" />
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
    </AuthBox>
  );
};

export default SignUp;
