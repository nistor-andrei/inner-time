import { ReactNode } from "react";

const IconBox = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md">
      {children}
    </div>
  );
};

export default IconBox;
