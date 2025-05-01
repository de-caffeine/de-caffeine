import { twMerge } from "tailwind-merge";
import chat from "../../assets/images/chat.png";
import like from "../../assets/images/like.png";
import plus from "../../assets/images/plus.png";

const floatBase = `w-[60px] h-[60px] bg-[#A9907E] rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center cursor-pointer`;

export default function FloatingButton() {
  return (
    <>
      <button type="button" className={twMerge(floatBase)}>
        <img src={plus} alt="채팅" />
      </button>
      <button type="button" className={twMerge(floatBase)}>
        <img src={chat} alt="채팅" className="relative top-0.5 right-[1px]" />
      </button>
      <button
        type="button"
        className={twMerge(
          floatBase,
          "flex-col leading-none text-[#ffffff] text-[12px]"
        )}>
        <img className="mt-[6px] mb-0" src={like} alt="좋아요" />1
        {/* 하트 갯수 onClick 상태값 사용해야함 */}
      </button>
    </>
  );
}
