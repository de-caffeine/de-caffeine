export default function ChattingBubble({
  sender,
  children,
  date,
}: {
  sender: 'user' | 'me';
  children: React.ReactNode;
  date: string;
}) {
  return (
    <div
      className={`relative flex gap-[5px] ${
        sender === 'me' ? 'justify-end' : ''
      }`}
    >
      {sender === 'user' && (
        <div className="nanum-gothic-regular max-w-[60%] rounded-tl-[23px] rounded-r-[23px] bg-[#D7CAB9] px-[23px] py-[13px] text-[16px] break-all text-black dark:bg-[#A9907E] dark:text-[#e0e0e0]">
          {children}
        </div>
      )}

      <span className="nanum-gothic-regular self-end text-[12px] text-[#ababab] dark:text-[#e0e0e0]">
        {date}
      </span>

      {sender === 'me' && (
        <div className="nanum-gothic-regular max-w-[60%] rounded-l-[23px] rounded-tr-[23px] border border-[#D7CAB9] bg-white px-[23px] py-[13px] text-[16px] break-all text-black dark:border-[#505050] dark:bg-[#3a3a3a] dark:text-[#e0e0e0]">
          {children}
        </div>
      )}
    </div>
  );
}
