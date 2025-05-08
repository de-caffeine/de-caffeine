import { NavLink, Outlet } from 'react-router-dom';

const tabData: Record<string, { name: string; path: string }[]> = {
  community: [
    { name: '전체', path: '/community' },
    { name: '일상공유', path: '/community/daily' },
    { name: '개발일지', path: '/community/develop' },
    { name: '취업정보', path: '/community/employ' },
    { name: '팀원모집', path: '/community/recruit' },
  ],
  question: [
    { name: '전체', path: '/question' },
    { name: '미해결', path: '/question/solved' },
    { name: '해결완료', path: '/question/unsolved' },
  ],
  users: [
    { name: '전체', path: '/users' },
    { name: '온라인', path: '/users/online' },
    { name: '오프라인', path: '/users/offline' },
  ],
};

export default function SubNavigation({ channel }: { channel: string }) {
  const tabs = tabData[channel];

  return (
    <>
      {tabs && (
        <nav>
          <ul className="flex gap-5">
            {tabs.map(({ name, path }) => (
              <li key={path} className="cursor-pointer">
                <NavLink
                  to={path}
                  end={path === `/${channel}`} // '전체'일 때만 end 처리
                  className={({ isActive }) => (isActive ? '' : 'opacity-50')}
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <Outlet />
    </>
  );
}
