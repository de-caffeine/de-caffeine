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
            <div className="group relative cursor-pointer text-base dark:text-[#e0e0e0]">
              <span className={isActive ? 'font-semibold text-[#6B4C36]' : ''}>
                {name}
              </span>
              <span
                className={`absolute -bottom-[0px] left-0 h-[2px] w-0 bg-[#6B4C36] transition-discrete duration-200 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </div>
          )}
        </NavLink>
      ))}
    </div>
  );
}
