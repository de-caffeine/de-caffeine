import { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Logo from '../atoms/Logo';
import SignupPopup from '../molecules/SignupPopup';
import LoginPopup from '../molecules/LoginPopup';
import Navigation from '../atoms/Navigation';
import SearchBar from '../atoms/SearchBar';
import Icon from '../atoms/Icon';
import UserAvatar from '../atoms/UserAvatar';
import { getAuthUser, logout } from '../../api/auth';

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const avatarRef = useRef(null);
  const dropdownRef = useRef(null);

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
      await logout(); // 서버에서 세션 무효화
    } catch (e) {
      console.error('Logout failed:', e);
    }
    localStorage.removeItem('accessToken');

    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      getAuthUser()
        .then(() => setIsLoggedIn(true))
        .catch(() => setIsLoggedIn(false));
    } else {
      setIsLoggedIn(false);
    }
  }, [showLogin, showSignup]); // 로그인/회원가입 팝업 열고 닫힐 때 상태 재확인
  console.log(isLoggedIn, showDropdown);
  return (
    <>
      <div className="nanum-gothic-regular flex w-full max-w-[1300px] items-center p-7">
        <div className="flex flex-shrink-0 items-center space-x-7">
          <Link to="/">
            <Logo />
          </Link>
          <div className="hidden lg:flex">
            <Navigation />
          </div>
        </div>
        <div className="flex min-w-[150px] flex-grow items-center">
          <div className="mr-5 ml-auto max-w-[350px] min-w-[120px] flex-1">
            <SearchBar />
          </div>
          <div className="flex flex-shrink-0 items-center space-x-6">
            {isLoggedIn ? (
              <>
                <div className="ml-3 cursor-pointer">
                  <Icon name="alarmIcon" size={32} />
                </div>
                <div className="ml-3 cursor-pointer">
                  <Icon name="chatIcon" size={22} />
                </div>
                <div className="relative ml-3 inline-block">
                  <div
                    ref={avatarRef}
                    onClick={() => {
                      setShowDropdown(!showDropdown);
                    }}
                    className="flex cursor-pointer"
                  >
                    <UserAvatar />
                  </div>

                  {showDropdown && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 z-50 mt-2 w-25 rounded-[5px] bg-white text-[14px] shadow drop-shadow-sm"
                    >
                      <Link
                        to="/me"
                        onClick={() => setShowDropdown(false)}
                        className="block px-4 py-2 hover:text-[#6B4C36]"
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
                      <Link
                        className="block w-full px-4 py-2 text-left text-red-600 hover:text-red-900"
                        onClick={handleLogout}
                        to="/"
                      >
                        로그아웃
                      </Link>
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
      <Outlet />
    </>
  );
}
