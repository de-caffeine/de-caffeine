// src/pages/UserPage.tsx
import User from '../molecules/User';
import React, { useEffect, useState } from 'react';
import { getUserById } from '../../api/users';
import CommunityCard from '../molecules/CommunityCard';
import { getPostsByAuthor, getPostsByChannel } from '../../api/posts';
import { useLocation } from 'react-router-dom';
import QuestionCard from '../molecules/QuestionCard';
import { followUser, unfollowUser } from '../../api/follow';
import FloatingButton from '../atoms/FloatingButton';
import { createNotification } from '../../api/notifications';
// 변경: 메시지 API import 추가
import { createMessage, getConversations } from '../../api/messages'; // 변경: 메시지 전송 및 목록 조회
// 변경: ChatWindow import 추가
import ChatWindow from '../organisms/ChatWindow'; // 변경: 채팅창 컴포넌트
// 변경: Conversation 타입 import 추가
import type { Conversation } from '../organisms/ChatList'; // 변경: 대화 타입

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

  // 로그인 유저 id
  const loginUserId = localStorage.getItem('myId');
  // 로그인 유저와 path id 값 비교
  const isMe = loginUserId === id;
  console.log(loginUserId);

  // 변경: 채팅창 열림 상태 및 초기 대화 저장용 state 추가
  const [chatOpen, setChatOpen] = useState(false); // 변경: 채팅창 열림 상태
  const [initialConv, setInitialConv] = useState<Conversation | null>(null); // 변경: 초기 대화 저장 상태

  // 변경: "채팅 보내기" 버튼 클릭 시 호출할 핸들러 추가
  const handleStartChat = async () => {
    try {
      // 1) 메시지 전송 및 받아온 데이터 확인
      const newMsg = await createMessage('안녕하세요!', id);
      console.log('createMessage response ▶', newMsg);
      // Assume newMsg = { _id: '...', message: '안녕하세요!', chatRoomId: '68229f0e04101073e04876ca', ... }

      // 2) chatRoomId 만 뽑아서
      const chatRoomId = newMsg._id;
      if (!chatRoomId) {
        console.error('⚠️ chatRoomId가 응답에 없습니다.');
        return;
      }

      // 3) Conversation 객체를 직접 생성
      const conv: Conversation = {
        chatRoomId,
        partner: {
          _id: userData!._id, // UserPage의 userData 에 이미 로드된 대상 유저 정보
          fullName: userData!.fullName,
          avatarUrl: userData!.image,
          status: 'offline', // 원한다면 실제 상태로 교체
        },
        lastMessage: { timestamp: Date.now() },
        unreadCount: 0,
      };

      // 4) 강제로 초기 대화 세팅 & 창 열기
      setInitialConv(conv);
      setChatOpen(true);
    } catch (e) {
      console.error('채팅방 생성 또는 열기 실패', e);
    }
  };

  useEffect(() => {
    async function loadUserData() {
      try {
        const data = await getUserById(id);
        setUserData(data);
        setFollowerCount(data.followers.length ?? 0);
        setFollowCount(data.following.length ?? 0);

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

  useEffect(() => {
    if (userData && id) {
      const already = userData.following.some((rel) => rel.user === id);
      setIsFollowing(already);
    }
  }, [userData, id]);

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

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        const rel = userData!.following.find((r) => r.user === id);
        if (!rel) return;
        await unfollowUser(rel._id);
        setFollowerCount((count) => count - 1);
      } else {
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

  if (userDataLoading) return <div>로딩중 ... </div>;
  if (error) return <div>에러 : {error}</div>;
  if (userData === null) return <div>정보가 없습니다.</div>;

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
            userData.username ? (JSON.parse(userData.username).tags ?? []) : []
          }
          introduction={
            userData.username
              ? (JSON.parse(userData.username).introduction ?? '')
              : ''
          }
          github={
            userData.username
              ? (JSON.parse(userData.username).github ?? '')
              : ''
          }
          velog={
            userData.username ? (JSON.parse(userData.username).velog ?? '') : ''
          }
          homepage={
            userData.username
              ? (JSON.parse(userData.username).homepage ?? '')
              : ''
          }
          isMe={isMe}
          isFollowing={isFollowing}
          followHandler={handleFollow}
        />
      )}

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
            질문 <span className="text-[#3bb900]">{questionLiked.length}</span>
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
        <div
          className="fixed right-[10%] bottom-[5%] cursor-pointer" // 변경: 클릭 가능 커서 추가
          onClick={handleStartChat} // 변경: 클릭 시 채팅 시작
        >
          <FloatingButton buttonType="chat" />
        </div>
      )}

      {/* 변경: 채팅창 모달 */}
      {chatOpen && initialConv && (
        <ChatWindow
          onClose={() => setChatOpen(false)} // 변경: 채팅창 닫기 핸들러
          initialConversation={initialConv} // 변경: 초기 대화 전달
        />
      )}
    </>
  );
}
