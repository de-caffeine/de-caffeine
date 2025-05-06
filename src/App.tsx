import { useState } from 'react';
import SubNavigation from './components/atoms/SubNavigation';

export default function App() {
  const [selectedMenu, setSelectedMenu] = useState('커뮤니티'); // 메인 메뉴 선택 상태
  const [activeTab, setActiveTab] = useState('전체'); // 서브 탭 선택 상태
  const userName = '홍길동'; // 현재 로그인한 사용자
  const menu = ['커뮤니티', '코드질문'];
  const isMenu = menu.includes(selectedMenu); // 메뉴 이름이 포함되있는 지 확인인

  return (
    <div className="p-6">
      {/* 메뉴 선택 버튼 (테스트용) */}
      <div className="mb-4 space-x-2">
        <button
          onClick={() => setSelectedMenu('커뮤니티')}
          className="px-3 py-1"
        >
          커뮤니티
        </button>
        <button
          onClick={() => setSelectedMenu('코드질문')}
          className="px-3 py-1"
        >
          코드질문
        </button>
        <button onClick={() => setSelectedMenu(userName)} className="px-3 py-1">
          내 프로필
        </button>
        <button onClick={() => setSelectedMenu('김개발')} className="px-3 py-1">
          김개발 프로필
        </button>
      </div>

      {/* SubNavigation 컴포넌트 */}
      <SubNavigation
        selected={selectedMenu} // 메뉴
        name={isMenu ? '' : selectedMenu}
        username={userName}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />

      {/* 상태 확인용 출력 */}
      <div className="mt-4 text-sm text-gray-700">
        <p>
          선택된 메뉴: <strong>{selectedMenu}</strong>
        </p>
        <p>
          선택된 탭: <strong>{activeTab}</strong>
        </p>
      </div>
    </div>
  );
}
