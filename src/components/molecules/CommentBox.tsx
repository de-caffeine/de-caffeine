// src/components/molecules/CommentBox.tsx
import React, { useState, useRef, useEffect } from 'react';
import Info from '../atoms/Info';
import { createComment, deleteComment } from '../../api/comments';

export interface Comment {
  _id: string;
  comment: string; //  이 필드가 실제 댓글 텍스트
  author: { fullName: string; image?: string };
  createdAt: string;
}

interface CommentBoxProps {
  postId: string;
  initialComments?: Comment[]; // 작성된 초기 댓글
}

export default function CommentBox({
  postId,
  initialComments = [],
}: CommentBoxProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // textarea 높이 자동 조정
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = `${ta.scrollHeight}px`;
    }
  }, [text]);

  // 댓글 등록
  const handleSubmit = async () => {
    if (!text.trim()) return;
    try {
      const newComment = await createComment(postId, text);
      setComments((prev) => [...prev, newComment]);
      setText('');
    } catch {
      alert('댓글 작성에 실패했습니다.');
    }
  };

  // 댓글 삭제
  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deleteComment(id);
      setComments((prev) => prev.filter((c) => c._id !== id));
    } catch {
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="h-auto w-[979px] rounded-[5px] border border-[#ABABAB] bg-white px-25 py-8">
      {/* 댓글 개수 */}
      <p className="nanum-gothic-regular mb-4 text-sm">
        댓글 {comments.length}개
      </p>

      {/* 입력창 */}
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="댓글을 작성해주세요"
        rows={1}
        className="nanum-gothic-regular mb-6 w-[782px] resize-none overflow-hidden rounded border border-gray-300 p-6 text-sm"
      />

      {/* 등록 버튼 */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={handleSubmit}
          className="nanum-gothic-regular h-[34px] w-[77px] rounded bg-[#A9907E] text-white"
        >
          댓글 작성
        </button>
      </div>

      {/* 댓글 목록 */}
      {comments.map((c) => (
        <div
          key={c._id}
          className="mb-10 flex flex-col" /* ← flex-col 으로 바꿈 */
        >
          {/* 댓글 내용(가로 영역) */}
          <div className="flex items-start justify-between">
            {/* 작성자 정보 + 상대 시간 */}
            <Info
              imageUrl={c.author.image}
              size={32}
              userName={c.author.fullName}
              timestamp={c.createdAt}
            />

            {/* 댓글 텍스트 */}
            <p className="nanum-gothic-regular ml-4 flex-1 leading-relaxed whitespace-pre-line">
              {c.comment}
            </p>

            {/* 삭제 버튼 */}
            <div className="flex flex-col items-end gap-2">
              <button
                onClick={() => handleDelete(c._id)}
                className="text-sm hover:text-gray-600"
              >
                삭제
              </button>
            </div>
          </div>

          {/* 구분선(이제 전체 폭에 걸쳐서 그려짐) */}
          <hr className="mt-6 w-full border-t border-[#ABABAB]" />
        </div>
      ))}
    </div>
  );
}
