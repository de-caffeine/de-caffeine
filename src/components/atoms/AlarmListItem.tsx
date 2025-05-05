export default function AlarmListItem({
    userName,
    action,
    post,
    date,
}: {
    userName: string;
    action: "comment" | "liked" | "follow" | "message";
    post?: {
        title: string;
        link: string;
    };
    date: string;
}) {
    return (
        <>
            <div className="px-[10px]">
                <p className="w-[100%] nanum-gothic-regular text-[12px] line-clamp-2">
                    <span className="nanum-gothic-bold">{userName}</span>님
                    {action === "comment" && (
                        <>이 "{post!.title}" 게시글에 답글을 남겼습니다.</>
                    )}
                    {action === "liked" && (
                        <>이 "{post!.title}" 게시글을 좋아합니다.</>
                    )}
                    {action === "follow" && <>이 당신을 팔로우 했습니다.</>}
                    {action === "message" && (
                        <>에게서 새로운 메세지가 도착했습니다.</>
                    )}
                </p>
                <p className="nanum-gothic-regular text-[12px] text-[#ababab] mt-[5px]">
                    {date}
                </p>
            </div>
        </>
    );
}
