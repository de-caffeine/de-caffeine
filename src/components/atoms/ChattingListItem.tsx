// src/components/molecules/ChattingListItem.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from '../atoms/TimeAgo';
import UserAvatar from '../atoms/UserAvatar';

interface ChattingListItemProps {
  chatRoomId: string;
  imageUrl?: string; // 아바타 URL
  size?: number; // 아바타 크기(px)
  status?: 'online' | 'offline'; // online/offline 여부
  statusSize?: number; // 상태 점 크기(px)
  name: string; // 사용자 이름
  timestamp: string | number | Date; // 채팅 시간
  unreadCount?: number; // 읽지 않은 메시지 개수
}

export default function ChattingListItem({
  chatRoomId, //채팅방 ID
  imageUrl,
  size = 50, // 기본 아바타 크기
  status, // online/offline
  statusSize = 12, // 상태 점 기본 크기
  name,
  timestamp,
  unreadCount = 0, // 읽지 않은 메시지 기본 0
}: ChattingListItemProps) {
  // 300 이상은 "300+" 로 표시
  const displayCount =
    unreadCount > 300 ? '300+' : unreadCount > 0 ? String(unreadCount) : '';

  return (
    <Link
      to={`/chat/${chatRoomId}`}
      className="block w-[268px] hover:bg-gray-50"
    >
      <div className="flex h-[70px] w-[268px] items-center justify-between border-t border-b border-[#D9D9D9] px-4">
        <div className="flex items-center space-x-2">
          <UserAvatar
            imageUrl={imageUrl}
            size={size}
            status={status}
            statusSize={statusSize}
          />
          <span className="nanum-gothic-bold max-w-[12ch] truncate text-[16px]">
            {name}
          </span>
        </div>

        {/* 우측: 배지 위, 시간 아래 */}
        <div className="flex flex-col items-end space-y-1">
          {displayCount && (
            <span className="flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-[#C62E2E] px-1 text-[12px] font-semibold text-white">
              {displayCount}
            </span>
          )}
          <TimeAgo timestamp={timestamp} />
        </div>
      </div>
    </Link>
  );
}
