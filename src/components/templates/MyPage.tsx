import User from '../molecules/User';
import React, { useEffect, useState } from 'react';
// import { getUserById, updateUser } from '../../api/users';
import CommunityCard from '../molecules/CommunityCard';
import { getPostsByAuthor, getPostsByChannel } from '../../api/posts';
import { useLocation } from 'react-router-dom';
import QuestionCard from '../molecules/QuestionCard';
// import CommentCard from '../molecules/CommentCard';
import { useLoginStore } from '../../loginStore';

export default function MyPage() {
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [channelPosts, setChannelPosts] = useState<Post[]>([]);

  // const [userData, setUserData] = useState<User | null>(null);
  // const [followCount, setFollowCount] = useState<number>(0);
  // const [followerCount, setFollowerCount] = useState<number>(0);

  const location = useLocation();
  // "/me", "/me/question", "/me/comments", "/me/liked"
  const parts = location.pathname.split('/');
  const tab = parts[2] || 'me';

  const userInfo = useLoginStore.getState().myInfo!;

  // TODO
  // 현재 userId 의 팔로우 상태 확인

  useEffect(() => {
    async function loadUserData() {
      try {
        // const data = await getUserById(userId);
        // setUserData(data);
        // setFollowerCount(
        //   data.followers.length != null ? data.followers.length : 0,
        // );
        // setFollowCount(
        //   data.following.length != null ? data.following.length : 0,
        // );

        const postsData = await getPostsByAuthor(userInfo._id);
        setPosts(postsData);
      } catch (error: unknown) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setUserDataLoading(false);
      }
    }
    loadUserData();
  }, [userInfo._id]);

  useEffect(() => {
    async function postsOfEachChannel() {
      const daily = await getPostsByChannel('681d9fee7ffa911fa118e4b5');
      const develop = await getPostsByChannel('681da0077ffa911fa118e4ba');
      const employ = await getPostsByChannel('681da0247ffa911fa118e4be');
      const recruit = await getPostsByChannel('681da0307ffa911fa118e4c2');
      setChannelPosts([...daily, ...develop, ...employ, ...recruit]);
    }
    postsOfEachChannel();
  }, []);

  // 내 좋아요가 달린 포스트만 뽑기
  const likedPosts = channelPosts.filter((post) =>
    post.likes.some((like) => like.user === userInfo._id),
  );

  // console.log(channelPosts[0].likes);

  const wrapClass = `
  mx-auto
  w-full
  max-w-[1128px]
  grid
  gap-4
  pt-[17px]
  /* ① minmax(270px,1fr) 칸을 auto-fit: 
        화면에 270px씩 들어갈 만큼만 채우고,
        여유공간은 1fr 로 분배 → 반응형 컬럼 수 자동 감소 */
  [grid-template-columns:repeat(auto-fit,minmax(270px,1fr))]
`;
  const currentUserId = userInfo?._id;

  if (userDataLoading) return <div>로딩중 ... </div>;
  if (error) return <div>에러 : {error}</div>;
  if (userInfo === null) return <div>정보가 없습니다.</div>;
  else
    return (
      <>
        {tab === 'me' && (
          <User
            name={userInfo.fullName}
            followCount={userInfo.following.length}
            followerCount={userInfo.followers.length}
            imgUrl={userInfo.image}
            email={userInfo.email}
            techStack={
              userInfo.username
                ? JSON.parse(userInfo.username).tags
                  ? JSON.parse(userInfo.username).tags
                  : []
                : []
            }
            introduction={
              userInfo.username
                ? JSON.parse(userInfo.username).introduction
                  ? JSON.parse(userInfo.username).introduction
                  : ''
                : ''
            }
            github={
              userInfo.username
                ? JSON.parse(userInfo.username).github
                  ? JSON.parse(userInfo.username).github
                  : ''
                : ''
            }
            velog={
              userInfo.username
                ? JSON.parse(userInfo.username).velog
                  ? JSON.parse(userInfo.username).velog
                  : ''
                : ''
            }
            homepage={
              userInfo.username
                ? JSON.parse(userInfo.username).homepage
                  ? JSON.parse(userInfo.username).homepage
                  : ''
                : ''
            }
            isMe={parts[2] !== currentUserId}

            // follow 함수 정의 필요
          />
        )}

        {/* 내가 쓴 글 */}
        {tab === 'me' && (
          <div className={wrapClass}>
            {posts.length === 0 ? (
              <div>아직 작성된 게시글이 없습니다.</div>
            ) : (
              posts.map((post) => <CommunityCard key={post._id} post={post} />)
            )}
          </div>
        )}

        {/* 내가 한 질문 */}
        {tab === 'question' &&
          (() => {
            const questionPosts = posts.filter(
              (post) =>
                post.channel.name === 'solved' ||
                post.channel.name === 'unsolved',
            );
            return (
              <div className="w-[980px] pt-[22px]">
                {questionPosts.length === 0 ? (
                  <div>아직 작성된 질문이 없습니다.</div>
                ) : (
                  questionPosts.map((post) => (
                    <QuestionCard key={post._id} post={post} />
                  ))
                )}
              </div>
            );
          })()}

        {/* 내가 쓴 댓글  */}
        {/* {tab === 'comments' && (
          <div>
            {userInfo.comments.map((c) => (
              <CommentCard key={c._id} title={c.title} comment={c.comment} />
            ))}
          </div>
        )} */}

        {/*  좋아요 누른 글 */}
        {tab === 'liked' && (
          <div className={wrapClass}>
            {likedPosts.length === 0 ? (
              <div>아직 좋아요를 누른 글이 없습니다.</div>
            ) : (
              likedPosts.map((post) => (
                <CommunityCard key={post._id} post={post} />
              ))
            )}
          </div>
        )}
      </>
    );
}
