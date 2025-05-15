// src/components/organisms/ChatWindow.tsx
import React, { useState, useEffect } from 'react';
import XIcon from '../../assets/images/close.png';
import ChatList, { Conversation } from './ChatList';
import ChatRoom from './ChatRoom';
import chatimage from '../../assets/images/chatIcon.png';
// 변경: 메시지 전송 API import 추가
import { createMessage } from '../../api/messages';

interface ChatWindowProps {
  onClose: () => void;
  initialConversation?: Conversation; // UserPage에서 넘겨줄 초기 대화
}

export default function ChatWindow({
  onClose,
  initialConversation,
}: ChatWindowProps) {
  // 처음엔 initialConversation이 있으면 바로 열고, 없으면 목록
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(
    initialConversation || null,
  );
  // 변경: 입력 메시지 draft 상태
  const [draft, setDraft] = useState<string>('');
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    if (initialConversation) {
      setSelectedChat(initialConversation);
    }
  }, [initialConversation]);

  // ChatList에서 선택된 대화가 넘어오면 이걸로 채팅방 연다
  const handleSelectChat = (conv: Conversation) => {
    setSelectedChat(conv);
  };

  // 뒤로가기: 목록 화면으로 복귀
  const handleBack = () => {
    setSelectedChat(null);
  };

  // 변경: 메시지 전송 핸들러
  const handleSend = async () => {
    if (!draft.trim() || !selectedChat) return;
    try {
      await createMessage(draft, selectedChat.partner._id);
      setDraft(''); // 전송 후 입력창 초기화
      setReloadTrigger((t) => t + 1); // ← 메시지 보낼 때마다 트리거 증가
      // TODO: 필요하다면 여기서 메시지 리스트 새로고침 로직 추가
    } catch (e) {
      console.error('메시지 전송 실패', e);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 z-50 flex h-[471px] w-[318px] flex-col rounded-lg bg-white shadow-lg">
      <header className="flex items-center justify-between border-b px-4 py-2">
        {selectedChat ? (
          <>
            <button onClick={handleBack}>←</button>
            <h4 className="text-lg font-bold">
              {selectedChat.partner.fullName}
            </h4>
          </>
        ) : (
          <>
            <h4 className="text-lg font-bold">채팅 목록</h4>
            <button onClick={onClose}>
              <img src={XIcon} alt="닫기" />
            </button>
          </>
        )}
      </header>

      <div className="flex-1 overflow-auto p-4">
        {selectedChat ? (
          // 클릭된 방으로 바로 이동
          <ChatRoom
            chatId={selectedChat.partner._id}
            reloadTrigger={reloadTrigger}
          />
        ) : (
          // 목록에는 onSelect 콜백 전달
          <ChatList
            onSelect={handleSelectChat}
            initialConversation={initialConversation}
          />
        )}
      </div>

      {selectedChat && (
        <footer className="border-t p-2">
          <div className="relative w-full">
            {/* 변경: draft 바인딩, onChange, Enter 키 전송 */}
            <input
              type="text"
              placeholder="메시지를 입력하세요"
              className="w-full rounded border px-2 py-1 pr-10"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            {/* 변경: onClick에 handleSend 연결 */}
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2"
              onClick={handleSend}
            >
              <img src={chatimage} alt="전송" className="h-6 w-6" />
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
