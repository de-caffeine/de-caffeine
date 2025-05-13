import User from '../molecules/User';
import React, { useEffect, useState } from 'react';
import { getUserById, updateUser } from '../../api/users';
import CommunityCard from '../molecules/CommunityCard';
import { getPostsByAuthor } from '../../api/posts';
import { useLocation } from 'react-router-dom';
import QuestionCard from '../molecules/QuestionCard';
import CommentCard from '../molecules/CommentCard';

// interface UserType {
//   _id: string; // 사용자 ID
//   fullName: string; // 사용자 이름
//   email: string; // 사용자 이메일
//   image?: string; // 프로필 이미지
//   posts?: Post[]; // 사용자가 작성한 게시물
//   likes?: Like[]; // 사용자가 좋아요한 게시물
//   followers: Follow[]; // 사용자를 팔로우하는 사용자
//   following: Follow[]; // 사용자가 팔로우하는 사용자
//   tags?: [];
//   introduction?: string;
//   github?: string;
//   velog?: string;
//   homepage?: string;
// }
export default function MyPage({ userId }: { userId: string }) {
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const [userData, setUserData] = useState<User | null>(null);
  const [followCount, setFollowCount] = useState<number>(0);
  const [followerCount, setFollowerCount] = useState<number>(0);

  const location = useLocation();
  // "/me", "/me/question", "/me/comments", "/me/liked"
  const parts = location.pathname.split('/');
  const tab = parts[2] || 'me';

  // TODO
  // 현재 userId 의 팔로우 상태 확인

  useEffect(() => {
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

        const postsData = await getPostsByAuthor(userId);
        setPosts(postsData);
      } catch (error: unknown) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setUserDataLoading(false);
      }

      const updatedUserData = await updateUser();
    }
    loadUserData();
  }, [userId]);

  if (userDataLoading) return <div>로딩중 ... </div>;
  if (error) return <div>에러 : {error}</div>;
  if (!userData) return <div>유저 정보를 불러오지 못했습니다.</div>;

  return (
    <>
      <User
        name={userData.fullName}
        followCount={followCount}
        followerCount={followerCount}
        imgUrl={userData.image}
        email={userData.email}
        techStack={userData.username.tags}
        introduction={userData.username.introduction}
        github={userData.username.github}
        velog={userData.username.velog}
        homepage={userData.username.homepage}
        // follow 함수 정의 필요
      />
      {/* 내가 쓴 글 */}
      {tab === 'me' && (
        <div className="mx-auto grid w-[1128px] grid-cols-4 gap-4 pt-[17px]">
          {posts.map((post) => (
            <CommunityCard key={post._id} post={post} />
          ))}
        </div>
      )}

      {/* 내가 한 질문 */}
      {tab === 'question' && (
        <div>
          {posts
            .filter((post) => post.channel.name === 'question')
            .map((post) => (
              <QuestionCard key={post._id} post={post} />
            ))}
        </div>
      )}

      {/* 내가 쓴 댓글  */}
      {tab === 'comments' && (
        <div>
          {userData.comments.map((c) => (
            <CommentCard key={c._id} title={c.title} comment={c.comment} />
          ))}
        </div>
      )}

      {/*  좋아요 누른 글 */}
      {tab === 'liked' && (
        <div>
          {posts.filter((post) => post.likes.post === userData.likes.post)}
        </div>
      )}
    </>
  );
}
