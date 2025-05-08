import { Link } from "react-router-dom";
import TimeAgo from "../atoms/TimeAgo";
import UserAvatar from "../atoms/UserAvatar";

interface InfoProps {
  imageUrl?: string;
  size?: number;
  timestamp: string | number | Date;
  userName: string;
}

export default function Info({ imageUrl, size = 24, timestamp, userName }: InfoProps) {
  return (
    <>
    <Link to="/user">
      <div className="inline-flex items-center space-x-2 flex-shrink-0">
        <UserAvatar imageUrl={imageUrl} size={size} />
        <div className="flex flex-col">
          {/* 이름max-w-[12ch] 넘어가면 뒤에... 표시 */}
          <span className="text-sm nanum-gothic-bold inline-block max-w-[12ch] truncate">
            {userName}
          </span>
          <TimeAgo timestamp={timestamp} />
        </div>
      </div>
      </Link>
    </>
  );
}
