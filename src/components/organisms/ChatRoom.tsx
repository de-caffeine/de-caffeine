// src/components/organisms/ChatRoom.tsx
import { useEffect, useState } from 'react';
import { getMessages } from '../../api/messages';
// 변경: ChattingBubble import
import ChattingBubble from '../atoms/ChattingBubble';

interface Message {
  _id: string;
  message: string;
  sender: { _id: string };
  createdAt: string;
}

interface ChatRoomProps {
  chatId: string;
  reloadTrigger?: number;
}

export default function ChatRoom({ chatId, reloadTrigger = 0 }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  // 내 ID
  const myId = localStorage.getItem('myId');

  useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      const data = await getMessages(chatId);
      if (isMounted) setMessages(data);
    };

    // 1) 초기 로드
    fetch();

    // 2) 폴링: 3초마다 새로 불러오기
    const interval = setInterval(fetch, 800);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [chatId, reloadTrigger]);

  return (
    <div className="space-y-2">
      {messages.map((msg) => (
        <ChattingBubble
          key={msg._id}
          // 내 메시지면 "me", 아니면 "user"
          sender={msg.sender._id === myId ? 'me' : 'user'}
          // 예: "오전 10:23" 형태로
          timestamp={msg.createdAt}
        >
          {msg.message}
        </ChattingBubble>
      ))}
    </div>
  );
}
