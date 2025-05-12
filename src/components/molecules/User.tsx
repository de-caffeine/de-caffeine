//  user name, imgUrl, tag-기술스택, 한줄 소개, 소셜정보, 팔로우, 팔로워 정보, 팔로우 버튼
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import Tag from '../atoms/Tag';
import UserAvatar from '../atoms/UserAvatar';
import UserName from '../atoms/UserName';

interface UserProps {
  name: string;
  followCount?: number;
  followerCount?: number;
  imgUrl?: string;
  techStack?: string[];
  introduction?: string;
  email?: string;
  github?: string;
  velog?: string;
  homepage?: string;
  // pageUserId: string;
  // currentUserId: string;
  followHandler?: () => void;
}

export default function User({
  name = '',
  followCount = 0,
  followerCount = 0,
  imgUrl = '',
  techStack = [],
  introduction = '',
  email = '',
  github = '',
  velog = '',
  homepage = '',
  // pageUserId,
  // currentUserId,
  followHandler,
}: UserProps) {
  // const isMe = pageUserId === currentUserId;
  return (
    <>
      <div className="flex min-h-[184px] w-[1128px] items-center justify-between border-b-[1px] border-b-[#ababab] px-[30px] py-[10px]">
        <div className="flex items-center justify-center">
          <UserAvatar size={150} imageUrl={imgUrl} />
          <div className="ml-8 flex flex-col gap-1 self-end">
            <UserName name={name} className="nanum-gothic-bold text-[28px]" />
            {/* tags 배열로 정보 받아와서 맵핑 */}
            <ul className="flex w-[580px] flex-wrap gap-1 leading-none">
              {techStack.map(
                (t) =>
                  // Tag value 값이 없을 경우 렌더링 하지 않음
                  t.trim() !== '' && (
                    <li key={t.trim().toUpperCase()}>
                      <Tag>{t.trim().toUpperCase()}</Tag>
                    </li>
                  ),
              )}
            </ul>
            <p className="pt-1 text-[16px]">{introduction}</p>
            <div className="flex items-center justify-start gap-3">
              <span className="flex justify-center gap-1 leading-5 tracking-wide text-[#767676]">
                <img src="/src/assets/images/mailStroke.svg" alt="메일" />
                {email}
              </span>
              {/* github, velog 주소값 여부에 따라 아이콘 렌더링 */}
              {github !== '' && (
                <span>
                  <a href={github} target="_blank">
                    <Icon name="githubIcon" size={18} />
                  </a>
                </span>
              )}
              {velog !== '' && (
                <span>
                  <a href={velog} target="_blank">
                    <Icon name="velogIcon" size={18} />
                  </a>
                </span>
              )}
              {homepage !== '' && (
                <span>
                  <a href={homepage} target="_blank">
                    <Icon name="homepageIcon" size={18} />
                  </a>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="nanum-gothic-regular mb-1 flex flex-col items-end gap-1 self-end text-[12px]">
          {/* {!isMe && (
            <Button full size="s" onClick={() => followHandler?.()}>
              팔로우
            </Button>
          )} */}

          <Button full size="s" onClick={() => followHandler?.()}>
            팔로우
          </Button>
          <div className="flex gap-4">
            <span>팔로우 {followCount}</span>
            <span>팔로워 {followerCount}</span>
          </div>
        </div>
      </div>
    </>
  );
}
