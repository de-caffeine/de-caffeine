import Tag from '../atoms/Tag';
import UserAvatar from '../atoms/UserAvatar';
import UserName from '../atoms/UserName';

interface UserCardProps {
  UName: string;
  followCount?: number;
  followerCount?: number;
  tags?: string[];
  imgUrl?: string;
  loginStatus?: 'offline' | 'online';
}

export default function UserCard({
  UName = '',
  followCount = 0,
  followerCount = 0,
  tags = [],
  imgUrl = '',
  loginStatus = 'offline',
}: UserCardProps) {
  return (
    <>
      <div className="r-[5px] flex h-[140px] w-[310px] gap-4 rounded-[5px] border-[1px] border-[#d9d9d9] p-[20px]">
        <div className="flex-shrink-0">
          <UserAvatar
            size={100}
            statusSize={20}
            imageUrl={imgUrl}
            status={loginStatus}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <UserName
            name={UName}
            className="nanum-gothic-regular top-0 text-[16px]"
          />
          <div className="nanum-gothic-regular mb-2 flex justify-baseline gap-4 text-[12px]">
            <span>팔로우 {followCount}</span>
            <span>팔로워 {followerCount}</span>
          </div>
          {/* tags 배열로 정보 받아와서 맵핑 */}
          <ul className="flex flex-wrap gap-0.5">
            {tags.slice(0, 2).map(
              (t) =>
                // Tag value 값이 없을 경우 렌더링 하지 않음
                t.trim() !== '' && (
                  <li key={t.trim().toUpperCase()}>
                    <Tag>{t.trim().toUpperCase()}</Tag>
                  </li>
                ),
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
