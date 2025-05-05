import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
};

export default function Input({
  type = "text",
  icon,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="relative flex items-center">
      {/* 아이콘  */}
      {icon && (
        <span className="absolute left-[10px] pointer-events-none flex items-center">
          {icon}
        </span>
      )}
      <input
        type={type}
        className={`
          ${icon ? "pl-10" : ""}
          rounded-[5px] border px-[20px] placeholder-[#ababab] nanum-gothic-regular text-[16px]
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
