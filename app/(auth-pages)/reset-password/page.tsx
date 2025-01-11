"use client";
import { resetPasswordAction } from "@/app/actions";
import Button from "@/components/Button/Button";
import HeaderAuth from "@/components/HeaderAuth/HeaderAuth";
import IconBox from "@/components/IconBox/IconBox";
import Input from "@/components/Input/Input";
import { EmailOtpType } from "@supabase/supabase-js";
import { useSearchParams } from "next/navigation";
import React, { FormEvent, Suspense, useState } from "react";
import toast from "react-hot-toast";
import { CgPassword } from "react-icons/cg";

const SearchParamsWrapper: React.FC<{
  onParamsReady: (token: string, type: EmailOtpType) => void;
}> = ({ onParamsReady }) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType;

  // Call the onParamsReady function with token and type when ready
  React.useEffect(() => {
    if (token && type) {
      onParamsReady(token, type);
    }
  }, [token, type, onParamsReady]);

  return null;
};

const ResetPasswordPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [type, setType] = useState<EmailOtpType | null>(null);

  const handleParamsReady = (token: string, type: EmailOtpType) => {
    setToken(token);
    setType(type);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setIsLoading(false);

    try {
      if (!token) {
        toast.error("Token-ul este invalid sau a expirat.");
        return;
      }
      if (!type) {
        toast.error("Tipul este invalid.");
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
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsWrapper onParamsReady={handleParamsReady} />
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
    </Suspense>
  );
};

export default ResetPasswordPage;
