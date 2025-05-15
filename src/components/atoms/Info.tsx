import { Link } from 'react-router-dom';
import TimeAgo from '../atoms/TimeAgo';
import UserAvatar from '../atoms/UserAvatar';

interface InfoProps {
  imageUrl?: string;
  size?: number;
  timestamp: string | number | Date;
  userName: string;
  userId: string;
}

export default function Info({
  imageUrl,
  size = 24,
  timestamp,
  userName,
  userId,
}: InfoProps) {
  return (
    <>
      <Link to={`/${userId}`}>
        <div className="inline-flex flex-shrink-0 items-center space-x-2">
          <UserAvatar imageUrl={imageUrl} size={size} />
          <div className="flex flex-col">
            {/* 이름max-w-[12ch] 넘어가면 뒤에... 표시 */}
            <span className="nanum-gothic-bold inline-block max-w-[12ch] truncate text-sm">
              {userName}
            </span>
            <TimeAgo timestamp={timestamp} />
          </div>
        </div>
      </Link>
    </>
  );
}
