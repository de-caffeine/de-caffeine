// src/components/molecules/Info.tsx
import TimeAgo from '../atoms/TimeAgo';
import UserAvatar from '../atoms/UserAvatar';

interface InfoProps {
  imageUrl?: string; //UserAvatar 이미지 링크
  size?: number; //UserAvatar 이미지 사이즈
  timestamp: string | number | Date; //api를통해 받아온 createdat이 들어옴
  name: string; // 사용자 이름
}

export default function Info({
  imageUrl,
  size = 24,
  timestamp,
  name,
}: InfoProps) {
  return (
    <div className="inline-flex flex-shrink-0 items-center space-x-2">
      <UserAvatar imageUrl={imageUrl} size={size} />
      <div className="flex flex-col">
        {/* 이름max-w-[12ch] 넘어가면 뒤에... 표시 */}
        <span className="nanum-gothic-bold inline-block max-w-[12ch] truncate text-[16px]">
          {name}
        </span>
        <TimeAgo timestamp={timestamp} />
      </div>
    </div>
  );
}
