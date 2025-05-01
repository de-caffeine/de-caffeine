import chat from "../../images/chat.png";
import like from "../../images/like.png";
import plus from "../../images/plus.png";

export default function FloatingButton() {
  return (
    <>
      <button
        type="button"
        className="w-[60px] h-[60px] bg-[#A9907E] rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center">
        <img src={plus} alt="채팅" />
      </button>
      <button
        type="button"
        className="w-[60px] h-[60px] bg-[#A9907E] rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center">
        <img src={chat} alt="채팅" className="relative top-0.5 right-[1px]" />
      </button>
      <button
        type="button"
        className="w-[60px] h-[60px] bg-[#A9907E] rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center leading-none text-[#ffffff] text-[12px]">
        <img className="mt-[6px] mb-0" src={like} alt="좋아요" />1
        {/* 하트 갯수 onClick 상태값 사용해야함 */}
      </button>
    </>
  );
}
