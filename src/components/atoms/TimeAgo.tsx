interface TimeAgoProps {
  timestamp: string | number | Date;
}

// 사용법: <TimeAgo timestamp={post.createdAt} /> props로 api를 통해 받은 createdAt을 넘겨준다
// api 예시 createdAt: "2021-10-15T20:48:19.816Z",
export default function TimeAgo({ timestamp }: TimeAgoProps) {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return <span className="text-[#00000080]">{`${diffInSeconds}초 전`}</span>;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return <span className="text-[#00000080]">{`${diffInMinutes}분 전`}</span>;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return <span className="text-[#00000080]">{`${diffInHours}시간 전`}</span>;
  }

  //7일이상이면 년월일 표시
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return <span className="text-[#00000080]">{`${diffInDays}일 전`}</span>;
  }

  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();

  return <span className="text-[#00000080]">{`${year}년 ${month}월 ${day}일`}</span>;
}
