import { useState } from "react";

export default function Navigation() {
  const [selected, setSelected] = useState("");

  const menu = ["커뮤니티", "코드질문", "개발자들"];

  return (
    <div className="flex space-x-[25px]">
      {menu.map((item) => (
        <button
          key={item}
          //클릭시 해당 항목 선택된 항목 선정
          onClick={() => setSelected(item)}
          className={`text-base relative 
            ${selected === item ? "text-[#6B4C36] font-semibold" : ""}
          `}
        >
          {item}
          {/* 커스텀 span 밑줄 그냥underline하면 이상함 */}
          {selected === item && (
            <span className="absolute left-0 -bottom-[0px] w-full h-[2px] bg-[#6B4C36]" />
          )}
        </button>
      ))}
    </div>
  );
}
