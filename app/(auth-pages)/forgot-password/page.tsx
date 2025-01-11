"use client";
import { forgotPasswordAction } from "@/app/actions";
import Button from "@/components/Button/Button";
import HeaderAuth from "@/components/HeaderAuth/HeaderAuth";
import IconBox from "@/components/IconBox/IconBox";
import Input from "@/components/Input/Input";
import { SignForm } from "@/lib/types";
import { useRouter } from "next/navigation";
import { FC, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineFingerPrint } from "react-icons/hi";
import { IoMdArrowBack } from "react-icons/io";

const ForgotPassword: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<SignForm>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setIsLoading(true);

    try {
      await toast.promise(forgotPasswordAction(formData), {
        loading: "Se trimite link-ul...",
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
            <HiOutlineFingerPrint className="w-6 h-6 text-gray-600" />
          </IconBox>
          <HeaderAuth
            primaryText="Ai uitat parola?"
            secondaryText="Îți trimitem instrucțiunile pe email."
          />
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            labelText="Adresa ta de email"
            name="email"
            placeHolderText="Introdu adresa de email"
          />
          <Button
            type="submit"
            text="Trimite link-ul pentru resetare"
            isLoading={isLoading}
          />
          <Button
            type="button"
            text="Înapoi la login"
            icon={<IoMdArrowBack className="mr-2" />}
            onClick={() => router.push("/sign-in")}
            variant="transparent"
          />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
