"use client";
import { signUpAction } from "@/app/actions";
import { FormEvent } from "react";

interface SignUpFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface SignUpForm extends HTMLFormElement {
  readonly elements: SignUpFormElements;
}

const SignUp = () => {
  const handleSubmit = async (e: FormEvent<SignUpForm>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await signUpAction(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <label>
        Email:
        <input type="email" name="email" required />
      </label>
      <label>
        Password:
        <input type="password" name="password" required />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
