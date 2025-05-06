interface SubNavigationProps {
  selected: string;
  name?: string; // 선택된 프로필 이름
  username: string; // 로그인 유저이름
  activeTab: string;
  onTabClick: (tab: string) => void;
}

export default function SubNavigation({
  selected,
  name,
  username,
  activeTab,
  onTabClick,
}: SubNavigationProps) {
  let tabs: string[] = [];
  const displayName = name === username ? '나' : name;

  if (selected === '커뮤니티') {
    tabs = ['전체', '일상공유', '개발일지', '취업정보', '팀원모집'];
  } else if (selected === '코드질문') {
    tabs = ['전체', '미해결', '해결완료'];
  } else {
    // 프로필 이름이 선택된 경우
    tabs = ['프로필', `${displayName}의 질문`, '작성한 댓글', '좋아요 누른 글'];
  }

  return (
    <div className="flex space-x-[25px]">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabClick(tab)}
          className={`text-base relative ${
            tab === activeTab ? 'text-[#000]' : 'text-[#ababab] '
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
