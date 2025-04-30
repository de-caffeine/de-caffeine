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
                    <div className="max-w-[60%] bg-[#D7CAB9] px-[20px] py-[10px] rounded-r-[20px] rounded-tl-[20px] text-[16px] break-all">
                        {children}
                    </div>
                )}
                <span className="self-end text-[12px] text-[#ababab]">
                    {date}
                </span>
                {sender === "me" && (
                    <div className="max-w-[60%] border border-[#D7CAB9] px-[20px] py-[10px] rounded-l-[20px] rounded-tr-[20px] text-[16px] break-all">
                        {children}
                    </div>
                )}
            </div>
        </>
    );
}
