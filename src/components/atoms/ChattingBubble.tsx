export default function ChattingBubble({
    sender,
    children,
    date,
}: {
    sender: "user" | "me";
    children: React.ReactNode;
    date: string;
}) {
    return (
        <>
            <div
                className={`relative flex gap-[5px] ${
                    sender === "me" && "justify-end"
                }`}
            >
                {sender === "user" && (
                    <div className="max-w-[60%] bg-[#D7CAB9] px-[23px] py-[13px] rounded-r-[23px] rounded-tl-[23px] text-[16px] nanum-gothic-regular break-all">
                        {children}
                    </div>
                )}
                <span className="self-end text-[12px] text-[#ababab] nanum-gothic-regular">
                    {date}
                </span>
                {sender === "me" && (
                    <div className="max-w-[60%] border border-[#D7CAB9] px-[23px] py-[13px] rounded-l-[23px] rounded-tr-[23px] text-[16px] nanum-gothic-regular break-all">
                        {children}
                    </div>
                )}
            </div>
        </>
    );
}
