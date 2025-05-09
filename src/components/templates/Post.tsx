// src/pages/PostPage.tsx
import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { getPost } from '../../api/posts';
import { getAuthUser } from '../../api/auth'; //  로그인 사용자 정보 불러오기
import { likePost, unlikePost } from '../../api/likes'; //  좋아요 생성/취소 API
import PostCard from '../molecules/PostCard';
import CommentBox, { Comment } from '../molecules/CommentBox';
import FloatingButton from '../atoms/FloatingButton';

interface Like {
  _id: string;
  user: string;
  post: string;
  createdAt: string;
}

export default function Post() {
  // const { postId } = useParams<{ postId: string }>(); // 나중에 params 사용
  const postId = '681c4426e932182b47edad9d';

  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]); //  댓글 목록 상태
  const [likes, setLikes] = useState<Like[]>([]); // 좋아요 목록 상태
  const [isLiked, setIsLiked] = useState(false); // 내가 좋아요 눌렀는지
  const [myLikeId, setMyLikeId] = useState<string | null>(null); //  내 좋아요 ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;

    (async () => {
      try {
        // 1) 로그인된 사용자 정보 가져오기
        const me = await getAuthUser();

        // 2) 포스트 + 댓글 + 좋아요 데이터 불러오기
        const data = await getPost(postId);
        setPost(data);
        setComments(data.comments ?? []); // ← post.comments 설정
        setLikes(data.likes ?? []); // ← post.likes 설정

        // (선택) 로그인된 내 좋아요가 이미 있는지 확인
        const existing = (data.likes as Like[]).find((l) => l.user === me._id);
        if (existing) {
          setIsLiked(true);
          setMyLikeId(existing._id);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || '불러오기 실패');
      } finally {
        setLoading(false);
      }
    })();
  }, [postId]);

  if (loading) return <p>로딩 중…</p>;
  if (error) return <p style={{ color: 'red' }}>에러: {error}</p>;
  if (!post) return null;

  // title/body/tags JSON 파싱
  let parsedTitle = post.title;
  let parsedBody = (post as any).body ?? '';
  let parsedTags: string[] = [];

  try {
    const obj = JSON.parse(post.title);
    parsedTitle = obj.title;
    parsedBody = obj.body;
    parsedTags = obj.tags ?? [];
  } catch {
    /* JSON 아니면 넘어감 */
  }

  // 좋아요 토글 핸들러
  const handleLike = async () => {
    if (isLiked && myLikeId) {
      // 좋아요 취소
      await unlikePost(myLikeId);
      setLikes((prev) => prev.filter((l) => l._id !== myLikeId));
      setIsLiked(false);
      setMyLikeId(null);
    } else {
      // 좋아요 추가
      const newLike = await likePost(postId);
      setLikes((prev) => [...prev, newLike]);
      setIsLiked(true);
      setMyLikeId(newLike._id);
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-4 py-8">
      <PostCard
        title={parsedTitle}
        body={parsedBody}
        imageUrl={post.image}
        authorName={post.author.fullName}
        createdAt={post.createdAt}
        tags={parsedTags}
      />

      {/* CommentBox에 초기 댓글 목록을 넘겨줍니다 */}
      <CommentBox postId={postId} initialComments={comments} />

      {/* 좋아요 FloatingButton */}
      <div className="fixed top-120 right-40">
        <FloatingButton
          buttonType="like"
          isLiked={isLiked}
          count={likes.length}
          onLike={handleLike}
        />
      </div>
    </div>
  );
}
