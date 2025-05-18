// src/components/organisms/Header.tsx
import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Logo from '../atoms/Logo';
import SignupPopup from '../molecules/SignupPopup';
import LoginPopup from '../molecules/LoginPopup';
import Navigation from '../atoms/Navigation';
import SearchBar from '../atoms/SearchBar';
import Icon from '../atoms/Icon';
import UserAvatar from '../atoms/UserAvatar';
import { logout } from '../../api/auth';
import AlarmIcon from '../molecules/AlarmIcon';
import { useLoginStore } from '../../stores/loginStore';
import ChatWindow from './ChatWindow'; // 변경: ChatWindow import 추가
import Button from '../atoms/Button';
import { useDarkModeStore } from '../../stores/darkModeStore';

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showChatWindow, setShowChatWindow] = useState(false); // 변경: 채팅창 토글 상태 추가
  const avatarRef = useRef(null);
  const dropdownRef = useRef(null);
  const storedImage = localStorage.getItem('myImage');
  const validImageUrl =
    storedImage && storedImage !== 'undefined' ? storedImage : undefined;
  const navigate = useNavigate();
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode);
  const toggleDarkMode = useDarkModeStore((state) => state.toggleDarkMode);

  const openLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const openSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        avatarRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node) &&
        !(avatarRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); // 서버 세션 무효화
    } catch (e) {
      console.error('Logout failed:', e);
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('myId');
    localStorage.removeItem('myImage');
    useLoginStore.getState().logout();

    setShowDropdown(false);
    navigate('/'); // 로그아웃 시 메인화면으로 이동
  };

  return (
    <>
      <div className="nanum-gothic-regular flex h-[80px] w-full max-w-[1300px] items-center px-7">
        <div className="flex flex-shrink-0 items-center space-x-7">
          <Link to="/">
            <Logo />
          </Link>
          <div className="hidden sm:flex">
            <Navigation />
          </div>
        </div>

        <div className="flex min-w-[150px] flex-grow items-center">
          <div className="mr-5 ml-auto max-w-[350px] min-w-[120px] flex-1">
            <SearchBar />
          </div>

          <div className="flex flex-shrink-0 items-center space-x-4">
            {isLoggedIn ? (
              <>
                <div className="z-10 mt-[5px] ml-3 cursor-pointer">
                  <AlarmIcon />
                </div>
                <div
                  className="ml-3 cursor-pointer dark:contrast-70 dark:invert"
                  onClick={() => setShowChatWindow(true)} // 변경: 채팅 아이콘 클릭 시 채팅창 열기
                >
                  <Icon name="chatIcon" size={26} />
                </div>
                <div className="relative ml-3 inline-block">
                  <div
                    ref={avatarRef}
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex cursor-pointer"
                  >
                    <UserAvatar imageUrl={validImageUrl} size={40} />
                  </div>

                  {showDropdown && (
                    <div
                      ref={dropdownRef}
                      className="dark:bg-dark-card dark:text-dark-text absolute right-0 z-50 mt-2 w-25 rounded-[5px] bg-white text-[14px] shadow drop-shadow-sm"
                    >
                      <Link
                        to={`/${localStorage.getItem('myId')}`}
                        onClick={() => setShowDropdown(false)}
                        className="block px-4 py-2 hover:text-[#4b4744]"
                      >
                        마이페이지
                      </Link>
                      <Link
                        to="/setting"
                        onClick={() => setShowDropdown(false)}
                        className="block px-4 py-2 hover:text-[#6B4C36]"
                      >
                        설정
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-red-600 hover:text-red-900"
                      >
                        로그아웃
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Button onClick={openLogin} size="s">
                  Log In
                </Button>
                <Button onClick={openSignup} size="s" full>
                  Sign Up
                </Button>
              </>
            )}
          </div>

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
          <div className="ml-3 flex flex-col justify-center">
            <input
              type="checkbox"
              id="light-switch"
              className="light-switch sr-only"
              checked={isDarkMode} // 🌗 라이트 모드일 때 체크됨
              onChange={toggleDarkMode}
            />
            <label
              className="relative cursor-pointer p-2"
              htmlFor="light-switch"
            >
              <svg
                className={`${isDarkMode ? 'hidden' : ''}`}
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-slate-300"
                  d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
                />
                <path
                  className="fill-slate-400"
                  d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
                />
              </svg>
              <svg
                className={`${isDarkMode ? '' : 'hidden'}`}
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-slate-400"
                  d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
                />
                <path
                  className="fill-slate-500"
                  d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
                />
              </svg>
              <span className="sr-only">Switch to light / dark version</span>
            </label>
          </div>
        </div>
      </div>

      {showChatWindow && (
        <ChatWindow
          onClose={() => setShowChatWindow(false)} // 변경: 채팅창 닫기 핸들러
        />
      )}

      <Outlet />
    </>
  );
}
