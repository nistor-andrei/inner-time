import clsx from "clsx";
import React from "react";

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  className?: string;
}

const Checkbox = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  className = "",
}: CheckboxProps) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={clsx(
          "h-4 w-4 text-primary border-gray-300 rounded cursor-pointer checked:bg-primary disabled:opacity-50",
          className
        )}
      />
      <label htmlFor={id} className="text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
