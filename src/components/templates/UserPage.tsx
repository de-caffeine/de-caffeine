import User from '../molecules/User';
import React, { useEffect, useState } from 'react';
import { getUserById } from '../../api/users';
import CommunityCard from '../molecules/CommunityCard';
import { getPostsByAuthor, getPostsByChannel } from '../../api/posts';
import { useLocation } from 'react-router-dom';
import QuestionCard from '../molecules/QuestionCard';
import { followUser, unfollowUser } from '../../api/follow';
// import { useLoginStore } from '../../loginStore';
import FloatingButton from '../atoms/FloatingButton';
import { createNotification } from '../../api/notifications';
// import PostCard from '../molecules/PostCard';
// import CommentCard from '../molecules/CommentCard';

export default function UserPage() {
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [channelPosts, setChannelPosts] = useState<Post[]>([]);
  const [userData, setUserData] = useState<User | null>(null);
  const [followCount, setFollowCount] = useState<number>(0);
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const location = useLocation();
  // "/id", "/id/question", "/id/comments", "/id/liked"
  const parts = location.pathname.split('/');
  const id = parts[1];

  // const loginUser = useLoginStore.getState().myInfo!;

  // 로그인 유저 id
  const loginUserId = localStorage.getItem('myId');
  // 로그인 유저와 path id 값 비교
  const isMe = loginUserId === id;
  console.log(loginUserId);

  useEffect(() => {
    async function loadUserData() {
      try {
        const data = await getUserById(id);
        setUserData(data);
        setFollowerCount(
          data.followers.length != null ? data.followers.length : 0,
        );
        setFollowCount(
          data.following.length != null ? data.following.length : 0,
        );

        const postsData = await getPostsByAuthor(id);
        setPosts(postsData);
      } catch (error: unknown) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setUserDataLoading(false);
      }
    }
    loadUserData();
  }, [id]);

  // console.log(posts);
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

  //로그인 유저와 현재 페이지 Id를 받아온 후 초기화
  useEffect(() => {
    if (userData && id) {
      const already = userData.following.some((rel) => rel.user === id);
      setIsFollowing(already);
    }
  }, [userData, id]);

  // 내 좋아요가 달린 포스트만 뽑기
  const likedPosts = channelPosts.filter((post) =>
    post.likes.some((like) => like.user === id),
  );
  const communityLiked = likedPosts.filter(
    (c) =>
      c.channel._id === '681d9fee7ffa911fa118e4b5' ||
      c.channel._id === '681da0077ffa911fa118e4ba' ||
      c.channel._id === '681da0247ffa911fa118e4be' ||
      c.channel._id === '681da0307ffa911fa118e4c2',
  );

  const questionLiked = likedPosts.filter(
    (q) => q.channel.name === 'solved' || q.channel.name === 'unsolved',
  );

  //follow 핸들
  const handleFollow = async () => {
    try {
      if (isFollowing) {
        const rel = userData!.following.find((r) => r.user === id);
        if (!rel) return;
        //언팔
        await unfollowUser(rel._id);
        setFollowerCount((count) => count - 1);
      } else {
        //팔로우
        const newRel = await followUser(id);
        await createNotification({
          notificationType: 'FOLLOW',
          notificationTypeId: newRel._id,
          userId: id,
        });
        setFollowerCount((count) => count + 1);
      }
      setIsFollowing((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };
  // console.log(channelPosts[0].likes);

  if (userDataLoading) return <div>로딩중 ... </div>;
  if (error) return <div>에러 : {error}</div>;
  if (userData === null) return <div>정보가 없습니다.</div>;
  else
    return (
      <>
        {!parts[2] && (
          <User
            name={userData.fullName}
            followCount={followCount}
            followerCount={followerCount}
            imgUrl={userData.image}
            email={userData.email}
            techStack={
              userData.username
                ? JSON.parse(userData.username).tags
                  ? JSON.parse(userData.username).tags
                  : []
                : []
            }
            introduction={
              userData.username
                ? JSON.parse(userData.username).introduction
                  ? JSON.parse(userData.username).introduction
                  : ''
                : ''
            }
            github={
              userData.username
                ? JSON.parse(userData.username).github
                  ? JSON.parse(userData.username).github
                  : ''
                : ''
            }
            velog={
              userData.username
                ? JSON.parse(userData.username).velog
                  ? JSON.parse(userData.username).velog
                  : ''
                : ''
            }
            homepage={
              userData.username
                ? JSON.parse(userData.username).homepage
                  ? JSON.parse(userData.username).homepage
                  : ''
                : ''
            }
            isMe={isMe}
            isFollowing={isFollowing}
            followHandler={handleFollow}

            // follow 함수 정의 필요
          />
        )}
        {/* 내가 쓴 글 */}
        {!parts[2] && (
          <div className="mx-auto flex w-[1128px] flex-wrap justify-start gap-4 pt-[17px]">
            {posts.length === 0 ? (
              <div>아직 작성된 게시글이 없습니다.</div>
            ) : (
              posts
                .filter(
                  (p) =>
                    p.channel._id === '681d9fee7ffa911fa118e4b5' ||
                    p.channel._id === '681da0077ffa911fa118e4ba' ||
                    p.channel._id === '681da0307ffa911fa118e4c2' ||
                    p.channel._id === '681da0247ffa911fa118e4be',
                )
                .map((post) => <CommunityCard key={post._id} post={post} />)
            )}
          </div>
        )}
        {/* 내가 한 질문 */}
        {parts[2] === 'question' &&
          (() => {
            const questionPosts = posts.filter(
              (post) =>
                post.channel.name === 'solved' ||
                post.channel.name === 'unsolved',
            );
            return (
              <div className="flex w-[980px] flex-col gap-4 pt-[22px]">
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
        {parts[2] === 'liked' && (
          <div className="mx-auto w-[1128px] pt-4 text-left">
            <p>
              커뮤니티{' '}
              <span className="text-[#3bb900]">{communityLiked.length}</span>
            </p>
          </div>
        )}
        {parts[2] === 'liked' && (
          <div className="mx-auto flex w-[1128px] flex-wrap justify-start gap-4 pt-[17px]">
            {communityLiked.length === 0 ? (
              <div>아직 좋아요를 누른 글이 없습니다.</div>
            ) : (
              likedPosts.map((post) => (
                <QuestionCard key={post._id} post={post} />
              ))
            )}
          </div>
        )}
        {parts[2] === 'liked' && (
          <div className="mx-auto w-[1128px] pt-4 text-left">
            <p className="justify-start pt-4">
              질문{' '}
              <span className="text-[#3bb900]">{communityLiked.length}</span>
            </p>
          </div>
        )}
        {parts[2] === 'liked' && (
          <div className="mx-auto flex w-[1128px] flex-wrap justify-start gap-4 pt-[17px]">
            {questionLiked.length === 0 ? (
              <div>아직 좋아요를 누른 글이 없습니다.</div>
            ) : (
              questionLiked.map((post) => (
                <QuestionCard key={post._id} post={post} />
              ))
            )}
          </div>
        )}
        {!isMe && (
          <div className="fixed right-[10%] bottom-[5%]">
            <FloatingButton buttonType="chat" />
          </div>
        )}
      </>
    );
}
