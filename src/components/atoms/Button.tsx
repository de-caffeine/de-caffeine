import React from 'react';

export default function Button({
  full,
  size,
  onClick,
  children,
}: {
  full?: boolean;
  size: 's' | 'm' | 'l';
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`nanum-gothic-regular cursor-pointer rounded-[5px] border ${
        full
          ? 'border-[#6B4C36] bg-[#6B4C36] text-white'
          : 'dark:border-dark-border dark:bg-dark-button dark:text-dark-text'
      } ${
        size === 's' &&
        `h-[30px] w-[70px] text-[10px] ${full ? 'border-[#A9907E] bg-[#A9907E]' : ''}`
      } ${size === 'm' && 'h-[40px] w-[100px] text-[14px]'} ${size === 'l' && 'h-[50px] w-[350px] text-[16px]'} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
