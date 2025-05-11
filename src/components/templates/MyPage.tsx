import User from '../molecules/User';
import { useEffect, useState } from 'react';
import { getUserById } from '../../api/users';

export default function MyPage({ userId }: { userId: string }) {
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [userData, setUserData] = useState<User>(null);
  const [followCount, setFollowCount] = useState<number>(0);
  const [followerCount, setFollowerCount] = useState<number>(0);

  // TODO
  // 현재 userId 의 팔로우 상태 확인

  //follow fetch
  useEffect(() => {
    //유저정보 로드
    async function loadUserData() {
      try {
        const data = await getUserById(userId);
        setUserData(data);
        setFollowerCount(
          data.followers.length != null ? data.followers.length : 0,
        );
        setFollowCount(
          data.following.length != null ? data.following.length : 0,
        );
      } catch (e) {
        console.error('유저정보 로드 에러', e);
      } finally {
        setUserDataLoading(false);
      }
    }
    loadUserData();
  }, [userId]);

  if (userDataLoading) return <div>로딩중 ... </div>;
  return (
    <>
      <h1>MyPage Component</h1>
      <User
        name={userData.fullName}
        followCount={followCount}
        followerCount={followerCount}
        imgUrl={userData.image}
        email={userData.email}
        // username에서 받아오기
        techStack={[
          'html',
          'javascript',
          'css',
          'tailwind',
          'typescript',
          'ssr',
          'more',
          'more',
          'more',
        ]}
        introduction="안녕하세요. 고양이 개발자입니다."
        github={'github'}
        // velog={}
        // homepage={}
        // follow 함수 정의 필요
      />
    </>
  );
}
