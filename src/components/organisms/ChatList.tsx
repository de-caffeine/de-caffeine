// src/components/organisms/ChatList.tsx
import React, { useEffect, useState } from 'react';
import { getConversations, markMessagesSeen } from '../../api/messages';
import ChattingListItem from '../atoms/ChattingListItem';

export interface Conversation {
  chatRoomId: string;
  partner: {
    _id: string;
    fullName: string;
    avatarUrl?: string;
    status?: 'online' | 'offline';
  };
  lastMessage: { timestamp: string | number | Date };
  unreadCount: number;
}

// API에서 받아오는 “raw” 데이터 형태
interface RawConversation {
  _id: string;
  createdAt: string;
  seen: boolean;
  sender: {
    _id: string;
    fullName: string;
    avatarUrl?: string;
    isOnline?: boolean;
  };
  receiver: {
    _id: string;
    fullName: string;
    avatarUrl?: string;
    isOnline?: boolean;
  };
}

interface ChatListProps {
  onSelect: (conv: Conversation) => void;
  initialConversation?: Conversation;
}

export default function ChatList({
  onSelect,
  initialConversation,
}: ChatListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConvs() {
      try {
        const raw: RawConversation[] = await getConversations();
        const meId = localStorage.getItem('myId');

        const mapped: Conversation[] = raw.map((r: RawConversation) => {
          const isSender = r.sender._id === meId;
          const partnerUser = isSender ? r.receiver : r.sender;
          return {
            chatRoomId: r._id,
            partner: {
              _id: partnerUser._id,
              fullName: partnerUser.fullName,
              avatarUrl: partnerUser.avatarUrl,
              status: partnerUser.isOnline ? 'online' : 'offline',
            },
            lastMessage: { timestamp: r.createdAt },
            unreadCount: r.seen ? 0 : 1,
          };
        });

        let merged = mapped;
        if (
          initialConversation &&
          !mapped.some((c) => c.chatRoomId === initialConversation.chatRoomId)
        ) {
          merged = [initialConversation, ...mapped];
        }

        setConversations(merged);
      } catch (e) {
        console.error('대화 목록 불러오기 실패', e);
      } finally {
        setLoading(false);
      }
    }
    fetchConvs();
  }, [initialConversation]);

  const handleClick = async (conv: Conversation) => {
    if (conv.unreadCount > 0) {
      try {
        await markMessagesSeen(conv.chatRoomId);
      } catch (e) {
        console.error('메시지 읽음 처리 실패', e);
      }
    }
    onSelect(conv);
  };

  if (loading) return <p className="p-4 text-center">로딩 중…</p>;
  if (conversations.length === 0)
    return <p className="p-4 text-center">대화가 없습니다.</p>;

  return (
    <div className="h-full overflow-y-auto">
      {conversations.map((conv) => (
        <ChattingListItem
          key={conv.chatRoomId}
          onClick={() => handleClick(conv)}
          chatRoomId={conv.chatRoomId}
          imageUrl={conv.partner.avatarUrl || ''}
          size={50}
          status={conv.partner.status}
          statusSize={12}
          name={conv.partner.fullName}
          timestamp={conv.lastMessage.timestamp}
          unreadCount={conv.unreadCount}
        />
      ))}
    </div>
  );
}
