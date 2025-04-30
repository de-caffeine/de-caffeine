import React from "react";

export default function Button({
    full,
    size,
    onClick,
    children,
}: {
    full?: boolean;
    size: "s" | "m" | "l";
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <>
            <button
                className={`border rounded-[5px]
                    ${full && "bg-[#6B4C36] border-[#6B4C36] text-white"}
                    ${
                        size === "s" &&
                        `w-[70px] h-[30px] text-[12px] ${
                            full && "bg-[#A9907E] border-[#A9907E]"
                        }`
                    }
                    ${size === "m" && "w-[100px] h-[40px] text-[14px]"}
                    ${size === "l" && "w-[350px] h-[50px] text-[16px]"}
            `}
                onClick={onClick}
            >
                {children}
            </button>
        </>
    );
}
