import { InputHTMLAttributes, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  name: string;
  placeHolderText?: string;
  isPassword?: boolean;
}

const Input = ({
  labelText,
  placeHolderText,
  name,
  isPassword,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {labelText}
      </label>
      <div className="relative">
        <input
          {...props}
          name={name}
          id={name}
          placeholder={placeHolderText}
          type={isPassword && showPassword ? "password" : "text"}
          className="mb-4 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {isPassword && (
          <button
            type="button"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </>
  );
};

export default Input;
