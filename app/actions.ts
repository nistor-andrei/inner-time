"use server";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { EmailOtpType } from "@supabase/supabase-js";

export const signUpAction = async (formData: FormData) => {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password || !name) {
    return { success: false, message: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        display_name: name,
      },
    },
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message:
      "Thanks for signing up! Please check your email for a verification link.",
  };
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, message: error.message };
  }
  return {
    success: true,
    message: "Autentificare reușită!",
  };
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return { message: "Email este necesar" };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return {
    success: true,
    message: "Link trimis cu success!",
  };
};

export const resetPasswordAction = async (
  formData: FormData,
  token: string,
  type: EmailOtpType
) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return { message: "Parolă și confirmarea parolei sunt necesare" };
  }

  if (password !== confirmPassword) {
    return { message: "Parolele nu corespund" };
  }

  const { error: otpError } = await supabase.auth.verifyOtp({
    type,
    token_hash: token,
  });

  if (otpError) {
    return { message: otpError.message };
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Parolă schimbată cu success",
  };
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
