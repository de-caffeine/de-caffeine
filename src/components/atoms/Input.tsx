import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  icon?: React.ReactNode;
  fontSize?: "16" | "12";
};

export default function Input({
  type = "text",
  className = "",
  icon,
  fontSize = "16", // 기본 16px
  ...props
}: InputProps) {
  return (
    <div className="relative flex items-center">
      {icon && (
        <span className="absolute left-[10px] pointer-events-none flex items-center">
          {icon}
        </span>
      )}
      <input
        type={type}
        className={`
          ${icon ? "pl-10" : ""}
          rounded-[5px] border px-[20px] placeholder-[#ababab]
          ${fontSize === "12" ? "text-[12px]" : "text-[16px]"}
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
