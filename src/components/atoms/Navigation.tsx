import { NavLink } from 'react-router-dom';

export default function Navigation() {
  const menu = [
    { name: '커뮤니티', path: '/community' },
    { name: '코드질문', path: '/question' },
    { name: '개발자들', path: '/users' },
  ];

  return (
    <div className="flex space-x-[25px]">
      {menu.map(({ name, path }) => (
        <NavLink key={name} to={path}>
          {({ isActive }) => (
            <div
              className={`relative text-base ${
                isActive ? 'font-semibold text-[#6B4C36]' : ''
              }`}
            >
              {name}
              {isActive && (
                <span className="absolute -bottom-[0px] left-0 h-[2px] w-full bg-[#6B4C36]" />
              )}
            </div>
          )}
        </NavLink>
      ))}
    </div>
  );
}
