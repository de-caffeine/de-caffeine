// src/components/organisms/ChatRoom.tsx
import React, { useEffect, useState, useRef } from 'react';
import { getMessages } from '../../api/messages';
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
  const myId = localStorage.getItem('myId');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    const fetch = async () => {
      const data = await getMessages(chatId);
      if (isMounted) setMessages(data);
    };

    fetch();
    const interval = setInterval(fetch, 800);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [chatId, reloadTrigger]);

  // 메시지가 바뀔 때마다 스크롤을 가장 아래로 이동
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="space-y-2">
      {messages.map((msg) => (
        <ChattingBubble
          key={msg._id}
          sender={msg.sender._id === myId ? 'me' : 'user'}
          timestamp={msg.createdAt}
        >
          {msg.message}
        </ChattingBubble>
      ))}
      <div ref={endRef} />
    </div>
  );
}
