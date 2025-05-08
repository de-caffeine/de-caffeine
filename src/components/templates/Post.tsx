// src/pages/PostPage.tsx
import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { getPost } from '../../api/posts';
import PostCard from '../molecules/PostCard';

export default function PostPage() {
  // const { postId } = useParams<{ postId: string }>();
  const postId = '681b7119fd19a829a842cf84';
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

  // title/body JSON 파싱 (임시 방편)
  let parsedTitle = post.title;
  let parsedBody = (post as any).body ?? '';
  try {
    const obj = JSON.parse(post.title);
    parsedTitle = obj.title;
    parsedBody = obj.body;
  } catch {
    /* JSON 아니면 넘어감 */
  }

  return (
    <div className="flex justify-center py-8">
      <PostCard
        title={parsedTitle}
        body={parsedBody}
        imageUrl={post.image}
        authorName={post.author.fullName}
        createdAt={post.createdAt}
      />
    </div>
  );
}
