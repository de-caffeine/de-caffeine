// src/components/organisms/PostCard.tsx
import React from 'react';
import TimeAgo from '../atoms/TimeAgo';
import UserName from '../atoms/UserName';

interface PostCardProps {
  title: string;
  body: string;
  imageUrl?: string;
  authorName: string;
  createdAt: string | number | Date;
}

export default function PostCard({
  title,
  body,
  imageUrl,
  authorName,
  createdAt,
}: PostCardProps) {
  return (
    <div className="h-auto w-[979px] rounded-[5px] border border-[#ABABAB] bg-white px-25 py-8">
      {/* 작성자 이름 + 생성 시간 */}
      <div className="items-left flex flex-col text-sm text-gray-600">
        {/* 제목 */}
        <div className="nanum-gothic-bold mb-4 text-[32px]">{title}</div>

        {/* 작성자 이름 + 생성 시간 + 수정/삭제 버튼 */}
        <div className="mb-2 flex items-center justify-between">
          {/* 좌측: 이름 + 시간 */}
          <div className="flex items-center gap-2">
            <UserName name={authorName} className="nanum-gothic-bold" />
            <TimeAgo timestamp={createdAt} />
          </div>

          {/* 우측: 수정 / 삭제 버튼 */}
          <div className="flex gap-2">
            <button className="text-sm text-blue-600 hover:text-blue-800">
              수정
            </button>
            <button className="text-sm text-red-600 hover:text-red-800">
              삭제
            </button>
          </div>
        </div>
      </div>
      <hr className="mb-6 border-t border-[#ABABAB]" />

      {/* 이미지 */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="post"
          className="max-h-[600px] w-full rounded-[5px]"
        />
      )}

      {/* 본문 */}
      <p className="nanum-gothic-regular leading-relaxed whitespace-pre-line">
        {body}
      </p>
    </div>
  );
}
