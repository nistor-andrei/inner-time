"use client";
import { resetPasswordAction } from "@/app/actions";
import Button from "@/components/Button/Button";
import HeaderAuth from "@/components/HeaderAuth/HeaderAuth";
import IconBox from "@/components/IconBox/IconBox";
import Input from "@/components/Input/Input";
import { EmailOtpType } from "@supabase/supabase-js";
import { useSearchParams } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgPassword } from "react-icons/cg";

const ResetPasswordPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [type, setType] = useState<EmailOtpType | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token_hash");
    const typeFromUrl = searchParams.get("type") as EmailOtpType;

    // Set the values when the search params are available
    if (tokenFromUrl && typeFromUrl) {
      setToken(tokenFromUrl);
      setType(typeFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setIsLoading(true);

    try {
      if (!token) {
        toast.error("Token-ul este invalid sau a expirat.");
        return;
      }
      if (!type) {
        return;
      }
      await toast.promise(resetPasswordAction(formData, token, type), {
        loading: "Se încarcă...",
        success: (response: {
          success: boolean;
          message: string | undefined;
        }) => {
          if (response.success) {
            return response.message;
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-7 flex-col items-center">
          <IconBox>
            <CgPassword className="w-6 h-6 text-gray-600" />
          </IconBox>
          <HeaderAuth
            primaryText="Setează o nouă parolă"
            secondaryText="Trebuie să conțină cel puțin 6 caractere"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <Input labelText="Parolă" name="password" isPassword={true} />
          <Input
            labelText="Confirmă Parola"
            name="confirmPassword"
            isPassword={true}
          />
          <Button isLoading={isLoading} text={"Resetează parola"} />
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
