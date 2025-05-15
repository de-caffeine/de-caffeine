// src/components/organisms/ChatRoom.tsx
import React, { useEffect, useState } from 'react';
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
    getMessages(chatId).then((data: Message[]) => {
      setMessages(data);
    });
  }, [chatId, reloadTrigger]);

  return (
    <div className="space-y-2">
      {messages.map((msg) => (
        <ChattingBubble
          key={msg._id}
          // 내 메시지면 "me", 아니면 "user"
          sender={msg.sender._id === myId ? 'me' : 'user'}
          // 예: "오전 10:23" 형태로
          date={new Date(msg.createdAt).toLocaleTimeString('ko-KR', {
            hour: 'numeric',
            minute: 'numeric',
          })}
        >
          {msg.message}
        </ChattingBubble>
      ))}
    </div>
  );
}
