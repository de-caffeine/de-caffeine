import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
  style?: "short" | "long" | "login" | "comment";
};

export default function Input({
  type = "text",
  icon,
  style = "short",
  ...props
}: InputProps) {
  // 댓글 textarea
  if (style === "comment") {
    return (
      <div className="relative flex items-center">
        <textarea
          className={`
            rounded-[5px] border border-[#ababab] px-[20px] pt-[] placeholder-[#ababab] nanum-gothic-regular text-[16px] w-[782px] h-[80px] resize-none
          `}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      </div>
    );
  }

  // input
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
          ${icon && "pl-10"}

          rounded-[5px] border px-[20px] placeholder-[#ababab] nanum-gothic-regular text-[16px]
          ${style === "short" && "w-[255px] h-[38px]"}
          ${style === "long" && "w-[520px] h-[38px]"}
          ${style === "login" && "w-[350px] h-[50px]"}
        `}
        {...props}
      />
    </div>
  );
}
