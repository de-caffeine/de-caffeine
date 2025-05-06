import Tag from '../atoms/Tag';
import UserAvatar from '../atoms/UserAvatar';
import UserName from '../atoms/UserName';

interface UserCardProps {
  followCount?: number;
  followerCount?: number;
  tags?: string[];
  imgUrl?: string;
  loginStatus?: 'offline' | 'online';
}

export default function UserCard({
  followCount = 0,
  followerCount = 0,
  tags = [],
  imgUrl = '',
  loginStatus = 'offline',
}: UserCardProps) {
  return (
    <>
      <div className="r-[5px] flex h-[140px] w-[310px] gap-4 rounded-[5px] border-[1px] border-[#d9d9d9] p-[20px]">
        <UserAvatar
          size={100}
          statusSize={20}
          imageUrl={imgUrl}
          status={loginStatus}
        />
        <div className="relative flex flex-col gap-2">
          <UserName
            name="홍길동"
            className="nanum-gothic-regular top-0 text-[16px]"
          />
          <div className="nanum-gothic-regular mb-2 flex justify-between gap-4 text-[12px]">
            <span>팔로우 {followCount}</span>
            <span>팔로워 {followerCount}</span>
          </div>
          {/* tags 배열로 정보 받아와서 맵핑 */}
          <ul className="flex gap-0.5">
            {tags.map(
              (t) =>
                // Tag value 값이 없을 경우 렌더링 하지 않음
                t.trim() !== '' && (
                  <li>
                    <Tag key={t} value={t} />
                  </li>
                ),
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
