import UserAvatar from '../atoms/UserAvatar';
import UserName from '../atoms/UserName';
import Tag from '../atoms/Tag';

// UserCard에 필요한 props 타입 선언
interface UserCardProps {
  UName: string;
  followCount: number;
  followerCount: number;
  tags: string[];
  imgUrl: string;
  loginStatus: 'online' | 'offline';
}

export default function UserCard({
  UName,
  followCount,
  followerCount,
  tags,
  imgUrl,
  loginStatus,
}: UserCardProps) {
  return (
    <div className="flex h-[140px] w-[310px] gap-4 rounded-[5px] border border-[#d9d9d9] p-5">
      <div className="flex-shrink-0">
        <UserAvatar
          size={100}
          statusSize={20}
          imageUrl={imgUrl}
          status={loginStatus}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <UserName name={UName} className="nanum-gothic-bold text-[16px]" />
        <div className="nanum-gothic-regular mb-2 flex items-baseline gap-4 text-[12px]">
          <span>팔로우 {followCount}</span>
          <span>팔로워 {followerCount}</span>
        </div>
        <ul className="flex flex-wrap gap-1">
          {tags.slice(0, 2).map((t) =>
            t.trim() !== '' ? (
              <li key={t.trim().toUpperCase()}>
                <Tag>{t.trim().toUpperCase()}</Tag>
              </li>
            ) : null,
          )}
        </ul>
      </div>
    </div>
  );
}
