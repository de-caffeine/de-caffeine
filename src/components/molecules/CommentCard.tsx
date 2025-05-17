export default function CommentCard({
  title,
  comment,
}: {
  title: string;
  comment: string;
}) {
  return (
    <>
      <div className="dark:border-dark-border dark:text-dark-text w-[100%] rounded-[5px] border border-[#ababab] px-[25px] py-[15px]">
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
