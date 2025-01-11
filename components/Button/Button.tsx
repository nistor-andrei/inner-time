import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoading?: boolean;
  className?: string;
  icon?: ReactNode;
  variant?: "default" | "transparent";
}

const Button = ({
  isLoading,
  text,
  className,
  icon,
  variant = "default",
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={isLoading}
      {...props}
      className={clsx(
        "w-full py-3 mt-2 font-semibold rounded-lg transition-colors duration-300 hover:bg-primary-dark ease-in-out disabled:opacity-50 disabled:pointer-events-none",
        variant === "default" && "bg-primary text-white ",
        variant === "transparent" &&
          "bg-transparent text-gray-500 flex justify-center items-center ",
        className
      )}
    >
      {icon}
      {isLoading ? "Se încarcă.." : text}
    </button>
  );
};

export default Button;
