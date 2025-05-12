import { useState } from 'react';
import SignupPopup from '../molecules/SignupPopup';
import LoginPopup from '../molecules/LoginPopup';

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false); // 모달을 닫는 함수
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>로그인</button>
      {showModal && <LoginPopup onClose={handleClose} />}
      <button onClick={() => setShowModal(true)}>회원가입</button>
      {showModal && <SignupPopup onClose={handleClose} />}
    </div>
    // 고쳐야 할 것: 에러메시지 올바르게 띄우기
  );
}
