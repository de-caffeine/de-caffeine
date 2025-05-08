// src/pages/PostPage.tsx
import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { getPost } from '../../api/posts';
import PostCard from '../molecules/PostCard';
import CommentBox, { Comment } from '../molecules/CommentBox';

export default function PostPage() {
  // const { postId } = useParams<{ postId: string }>(); // 나중에 params 사용
  const postId = '681c4426e932182b47edad9d';

  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]); // ← 댓글 배열 상태 추가
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;
    getPost(postId)
      .then((data) => {
        setPost(data);
        setComments(data.comments ?? []); // ← post.comments 를 세팅
      })
      .catch((err) => setError(err.message || '불러오기 실패'))
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) return <p>로딩 중…</p>;
  if (error) return <p style={{ color: 'red' }}>에러: {error}</p>;
  if (!post) return null;

  // title/body/tags JSON 파싱 (임시 방편)
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

  return (
    <div className="flex flex-col items-center gap-4 py-8">
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
    </div>
  );
}
