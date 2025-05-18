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
    <div className="dark:border-dark-border dark:bg-dark-card dark:text-dark-text flex h-[140px] w-[310px] gap-4 rounded-[5px] border border-[#d9d9d9] p-5 duration-300 ease-in-out hover:shadow-md dark:shadow-black">
      <div className="flex-shrink-0">
        <UserAvatar
          size={100}
          statusSize={20}
          imageUrl={imgUrl}
          status={loginStatus}
        />
      </div>
      <div className="flex flex-col justify-evenly gap-3">
        <div className="flex flex-col">
          <UserName name={UName} className="nanum-gothic-bold text-[16px]" />
          <div className="flex flex-col gap-0.5">
            <ul className="flex flex-wrap gap-1 leading-none">
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
        <div className="nanum-gothic-regular flex items-baseline gap-4 text-[12px]">
          <span>팔로우 {followCount}</span>
          <span>팔로워 {followerCount}</span>
        </div>
      </div>
    </div>
  );
}
