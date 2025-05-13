import { useState } from 'react';
import SignupPopup from '../molecules/SignupPopup';
import LoginPopup from '../molecules/LoginPopup';
import { Outlet } from 'react-router-dom';

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const openLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const openSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  return (
    <>
      <button onClick={() => setShowLogin(true)}>로그인</button>
      <button onClick={() => setShowSignup(true)}>회원가입</button>
      {showLogin && (
        <LoginPopup
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={openSignup}
        />
      )}
      {showSignup && (
        <SignupPopup
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={openLogin}
        />
      )}
      <Outlet />
    </>
    // 고쳐야 할 것: 에러메시지 올바르게 띄우기
  );
}
