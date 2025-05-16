// src/components/organisms/Header.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Logo from '../atoms/Logo';
import SignupPopup from '../molecules/SignupPopup';
import LoginPopup from '../molecules/LoginPopup';
import Navigation from '../atoms/Navigation';
import SearchBar from '../atoms/SearchBar';
import Icon from '../atoms/Icon';
import UserAvatar from '../atoms/UserAvatar';
import { logout } from '../../api/auth';
import AlarmIcon from '../molecules/AlarmIcon';
import ChatWindow from './ChatWindow'; // 변경: ChatWindow import 추가

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const isLoggedIn = !!localStorage.getItem('accessToken');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showChatWindow, setShowChatWindow] = useState(false); // 변경: 채팅창 토글 상태 추가
  const avatarRef = useRef(null);
  const dropdownRef = useRef(null);
  const storedImage = localStorage.getItem('myImage');
  const validImageUrl =
    storedImage && storedImage !== 'undefined' ? storedImage : undefined;

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
    setShowDropdown(false);
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
                <div className="ml-3 cursor-pointer dark:contrast-60 dark:invert">
                  <AlarmIcon />
                </div>
                <div
                  className="ml-3 cursor-pointer dark:contrast-60 dark:invert"
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
                      className="absolute right-0 z-50 mt-2 w-25 rounded-[5px] bg-white text-[14px] shadow drop-shadow-sm"
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
                <button
                  className="h-[40px] w-[70px] cursor-pointer rounded-[5px] border text-[12px]"
                  onClick={openLogin}
                >
                  Log In
                </button>
                <button
                  className="h-[40px] w-[70px] cursor-pointer rounded-[5px] bg-[#6B4C36] text-[12px] text-white"
                  onClick={openSignup}
                >
                  Sign Up
                </button>
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
