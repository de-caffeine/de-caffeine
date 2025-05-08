// src/pages/PostPage.tsx
import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { getPost } from '../../api/posts';
import PostCard from '../molecules/PostCard';
import CommentBox from '../molecules/CommentBox';

export default function PostPage() {
  // const { postId } = useParams<{ postId: string }>();
  const postId = '681c4426e932182b47edad9d';
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;
    getPost(postId)
      .then((data) => setPost(data))
      .catch((err) => setError(err.message || '불러오기 실패'))
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) return <p>로딩 중…</p>;
  if (error) return <p style={{ color: 'red' }}>에러: {error}</p>;
  if (!post) return null;

  // title/body/tags JSON 파싱 (임시 방편)
  let parsedTitle = post.title;
  let parsedBody = (post as any).body ?? '';
  let parsedTags: string[] = []; // ← tags 배열 초기화

  try {
    const obj = JSON.parse(post.title);
    parsedTitle = obj.title;
    parsedBody = obj.body;
    parsedTags = obj.tags ?? []; // ← JSON에서 tags 파싱
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
        tags={parsedTags} // ← tags prop 전달
      />
      <CommentBox />
    </div>
  );
}
