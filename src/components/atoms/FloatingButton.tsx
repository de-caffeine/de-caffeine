import chat from "../../images/chat.png";
import like from "../../images/like.png";

export default function FloatingButton() {
  return (
    <>
      <button
        type="button"
        className="w-[60px] h-[60px] bg-[#A9907E] rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-[#ffffff] text-[46px] font-thin flex items-center justify-center">
        <span className="relative bottom-1">+</span>
      </button>
      <button
        type="button"
        className="w-[60px] h-[60px] bg-[#A9907E] rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center">
        <img src={chat} alt="채팅" className="relative top-0.5 right-[1px]" />
      </button>
      <button
        type="button"
        className="w-[60px] h-[60px] bg-[#A9907E] rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex-col items-center justify-center">
        <img className="" src={like} alt="좋아요" />
        <p>1</p>
      </button>
      <p className="text-[9px]">이야야야야야야</p>
    </>
  );
}
