import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // 추가: useNavigate, useParams import
import TimeAgo from '../atoms/TimeAgo';
import UserName from '../atoms/UserName';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import '../../css/PostCard.css';

interface PostCardProps {
  title: string;
  body: string;
  imageUrl?: string;
  authorName: string;
  createdAt: string | number | Date;
  tags?: string[];
  onDelete?: () => void; // 삭제 콜백
  canDelete?: boolean; // 삭제 권한 여부
}

export default function PostCard({
  title,
  body,
  imageUrl,
  authorName,
  createdAt,
  tags = [],
  onDelete,
  canDelete,
}: PostCardProps) {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>(); // 현 URL에서 postId 꺼내기

  const handleEdit = () => {
    if (postId) {
      navigate(`/writer/${postId}`); // writer/:postId 경로로 이동
    }
  };

  return (
    <div className="h-auto w-[979px] rounded-[5px] border border-[#ABABAB] bg-white px-25 py-8">
      <div className="items-left flex flex-col text-sm">
        {/* 제목 */}
        <div className="nanum-gothic-bold mb-4 text-[32px]">{title}</div>

        {/* 작성자 이름 + 생성 시간 */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserName name={authorName} className="nanum-gothic-bold" />
            <TimeAgo timestamp={createdAt} />
          </div>
        </div>
      </div>

      {/* 태그 + 수정/삭제 버튼 영역 */}
      <div className="mb-3 flex items-center justify-between">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="nanum-gothic-regular rounded bg-[#D7CAB9] px-2 py-1 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          {canDelete && (
            <button
              onClick={handleEdit} // 수정 버튼에 클릭 핸들러 연결
              className="text-sm hover:text-gray-600"
            >
              수정
            </button>
          )}
          {canDelete && (
            <button
              onClick={() => onDelete?.()}
              className="text-sm hover:text-gray-600"
            >
              삭제
            </button>
          )}
        </div>
      </div>

      {/* 구분선 */}
      <hr className="mb-6 border-t border-[#ABABAB]" />

      {/* 이미지 */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="post"
          className="mb-6 max-h-[600px] w-full rounded-[5px]"
        />
      )}

      {/* 본문 */}
      <ReactQuill
        value={body}
        readOnly={true}
        theme="snow"
        modules={{ toolbar: false }}
        className="post-readonly-editor"
      />
    </div>
  );
}
