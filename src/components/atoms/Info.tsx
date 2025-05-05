// src/components/molecules/Info.tsx
import TimeAgo from "../atoms/TimeAgo";
import UserAvatar from "../atoms/UserAvatar";

interface InfoProps {
  imageUrl?: string;
  size?: number;
  timestamp: string | number | Date;
}

export default function Info({ imageUrl, size = 24, timestamp }: InfoProps) {
  return (
    <div className="inline-flex items-center space-x-2 flex-shrink-0">
      <UserAvatar imageUrl={imageUrl} size={size} />
      <div className="flex flex-col">
        {/* 이름max-w-[12ch] 넘어가면 뒤에... 표시 */}
        <span className="text-sm font-medium inline-block max-w-[12ch] truncate">
          저녁뭐먹지ㅋㅋ
        </span>
        <TimeAgo timestamp={timestamp} />
      </div>
    </div>
  );
}
