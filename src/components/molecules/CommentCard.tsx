export default function CommentCard ({title, comment}: {title:string; comment:string;}) {
  return (
    <>
      <div className="w-[100%] border border-[#ababab] rounded-[5px] px-[25px] py-[15px]">
        <p className="nanum-gothic-bold text-[18px] mb-[5px] line-clamp-1">"{title}" 글의 댓글</p>
        <p className="nanum-gothic-regular text-[16px] line-clamp-2">{comment}</p>
      </div>
    </>
  );
}