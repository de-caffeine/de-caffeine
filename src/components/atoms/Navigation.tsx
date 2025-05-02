// Navigation 컴포넌트가 받을 props 타입 정의
interface NavigationProps {
  selected: string; // 현재 선택된 메뉴 이름
  onSelect: (item: string) => void; // 메뉴를 클릭했을 때 실행할 함수
}

export default function Navigation({ selected, onSelect }: NavigationProps) {
  // 메뉴 항목 리스트 정의
  const menu = ["커뮤니티", "코드질문", "개발자들"];

  return (
    // 메뉴 버튼들을 가로로 나열하고, 각 버튼 사이에 25px 간격을 줌
    <div className="flex space-x-[25px]">
      {menu.map((item) => (
        <button
          key={item} // 각 버튼을 구분하기 위한 고유 key
          onClick={() => onSelect(item)} // 버튼 클릭 시 해당 메뉴를 선택하도록 콜백 호출
          className={`text-base relative 
            ${
              selected === item ? "text-[#6B4C36] font-semibold" : ""
            } // 선택된 메뉴일 경우 색상 및 폰트 강조
          `}
        >
          {item} {/* 메뉴 이름 표시 */}
          {/* 선택된 메뉴일 경우 아래에 커스텀 밑줄 추가 */}
          {selected === item && (
            <span className="absolute left-0 -bottom-[0px] w-full h-[2px] bg-[#6B4C36]" />
          )}
        </button>
      ))}
    </div>
  );
}

// 부모 컴포넌트에서 usestate를 이용해서 각 컨텐츠별로 출력할 수 있는지 확인된 코드
// import { useState } from "react";
// import Navigation from "./components/atoms/Navigation";

// export default function App() {
//   const [selectedMenu, setSelectedMenu] = useState("커뮤니티");

//   return (
//     <div>
//       <Navigation selected={selectedMenu} onSelect={setSelectedMenu} />

//       {/* 콘텐츠는 선택된 메뉴에 따라 변경됨 */}
//       <div className="mt-8">
//         {selectedMenu === "커뮤니티" && <div>커뮤니티 콘텐츠</div>}
//         {selectedMenu === "코드질문" && <div>코드질문 콘텐츠</div>}
//         {selectedMenu === "개발자들" && <div>개발자들 콘텐츠</div>}
//       </div>
//     </div>
//   );
// }
