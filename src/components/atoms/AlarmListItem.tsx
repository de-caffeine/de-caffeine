import { Link } from 'react-router-dom';
import TimeAgo from './TimeAgo';

export default function AlarmListItem({ alarm }: { alarm: Notification }) {
  return (
    <>
      <div className="py-[10px] dark:bg-[#1e1e1e] dark:text-[#e0e0e0]">
        <p className="nanum-gothic-regular line-clamp-2 w-[100%] text-sm dark:bg-[#1e1e1e]">
          <Link to={`/${alarm.author._id}`}>
            <span className="nanum-gothic-bold">{alarm.author.fullName}</span>님
          </Link>
          {alarm.comment && (
            <Link to={`/post/${alarm.post}`}>
              이 "{JSON.parse((alarm.comment.post as Post).title).title}"
              게시글에 답글을 남겼습니다.
            </Link>
          )}
          {alarm.like && (
            <Link to={`/post/${alarm.post}`}>
              이 "{JSON.parse((alarm.like.post as Post).title).title}" 게시글을
              좋아합니다.
            </Link>
          )}
          {/* {action === 'follow' && <>이 당신을 팔로우 했습니다.</>} */}
          {/* {action === 'message' && <>에게서 새로운 메세지가 도착했습니다.</>} */}
        </p>
        <p className="nanum-gothic-regular mt-[5px] cursor-default text-[12px] text-[#ababab] dark:text-[#e0e0e0]">
          <TimeAgo timestamp={alarm.createdAt} />
        </p>
      </div>
    </>
  );
}
