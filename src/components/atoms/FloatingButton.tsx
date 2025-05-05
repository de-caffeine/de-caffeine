import { twMerge } from "tailwind-merge";
// import like from "../../assets/images/like.png";
// import likeFilled from "../../assets/images/like_filled.png";

// children 으로 icon 이미지 받아서 재사용

const floatBase = `w-[60px] h-[60px] bg-[#A9907E] rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center cursor-pointer`;

export default function FloatingButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <button type="button" className={twMerge(floatBase)}>
        {children}
      </button>
    </>
  );
}
