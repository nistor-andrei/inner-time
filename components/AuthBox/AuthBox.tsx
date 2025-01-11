import { ReactNode } from "react";

interface AuthBoxProps {
  children: ReactNode;
}

const AuthBox = ({ children }: AuthBoxProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full">
        {children}
      </div>
    </div>
  );
};

export default AuthBox;
