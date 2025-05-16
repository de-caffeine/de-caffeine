export default function CommentCard({
  title,
  comment,
}: {
  title: string;
  comment: string;
}) {
  return (
    <>
      <div className="w-[100%] rounded-[5px] border border-[#ababab] px-[25px] py-[15px] dark:border-[#505050] dark:text-[#e0e0e0]">
        <p className="nanum-gothic-bold mb-[5px] line-clamp-1 text-[18px]">
          "{title}" 글의 댓글
        </p>
        <p className="nanum-gothic-regular line-clamp-2 text-[16px]">
          {comment}
        </p>
      </div>
    </>
  );
}
