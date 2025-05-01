import { twMerge } from "tailwind-merge";
import chat from "../../assets/images/chat.png";
import like from "../../assets/images/like.png";
import plus from "../../assets/images/plus.png";
import likeFilled from "../../assets/images/like_filled.png";
import { useState } from "react";

const floatBase = `w-[60px] h-[60px] bg-[#A9907E] rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center cursor-pointer`;

// 추후 좋아요 api 사용해서 like 클릭 수 업데이트 -> useState 현재값
export default function FloatingButton({
  buttonType,
}: {
  buttonType: "write" | "like" | "chat";
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState<number>(0);

  const likeClickHandler = () => {
    setIsLiked((prev) => !prev);
    setCount((count) => count + (isLiked ? -1 : 1));
  };

  return (
    <>
      <button type="button" className={twMerge(floatBase)}>
        <img src={plus} alt="채팅" />
      </button>
      <button type="button" className={twMerge(floatBase)}>
        <img src={chat} alt="채팅" className="relative top-0.5 right-[1px]" />
        {/* 토글 좋아요 버튼 */}
      </button>
      <button
        type="button"
        onClick={likeClickHandler}
        className={twMerge(
          floatBase,
          "flex-col leading-none text-[#ffffff] text-[12px]"
        )}>
        <img
          className="mt-[6px] mb-0"
          src={isLiked ? likeFilled : like}
          alt={isLiked ? likeFilled : like}
        />
        {count}
      </button>
    </>
  );
}
