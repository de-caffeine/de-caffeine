// src/components/organisms/Header.tsx
import { useEffect, useRef, useState } from 'react';
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
import { useLoginStore } from '../../loginStore';
import ChatWindow from './ChatWindow';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export default function Header() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        avatarRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error('Logout failed:', e);
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('myId');
    localStorage.removeItem('myImage');
    useLoginStore.getState().logout();
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <>
      <div className="nanum-gothic-regular flex h-[80px] w-full max-w-[1300px] items-center px-7">
        {/* Logo & Navigation */}
        <div className="flex flex-shrink-0 items-center space-x-7">
          <Link to="/">
            <Logo />
          </Link>
          <div className="hidden sm:flex">
            <Navigation />
          </div>
        </div>

        {/* Search & Icons */}
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
                  className="ml-3 cursor-pointer duration-200 hover:scale-110"
                  onClick={() => setShowChatWindow(true)}
                >
                  <Icon name="chatIcon" size={26} />
                </div>

                {/* Avatar & Dropdown */}
                <div className="relative ml-3 inline-block">
                  <div
                    ref={avatarRef}
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="ml-2 flex cursor-pointer duration-200 hover:scale-110"
                  >
                    <UserAvatar imageUrl={validImageUrl} size={30} />
                  </div>

                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        ref={dropdownRef}
                        className="dark:bg-dark-card dark:text-dark-text absolute right-0 z-50 mt-2 w-25 origin-top-right rounded-md border border-[#d9d9d9] bg-white text-[14px] shadow-md drop-shadow-sm"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
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
                          className="block w-full px-4 py-2 text-left text-red-600 hover:text-red-800"
                        >
                          로그아웃
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
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

      {/* Chat Window */}
      <AnimatePresence>
        {showChatWindow && (
          <ChatWindow onClose={() => setShowChatWindow(false)} />
        )}
      </AnimatePresence>

      <Outlet />
    </>
  );
}
