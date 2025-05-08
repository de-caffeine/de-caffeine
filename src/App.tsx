import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SubNavigation from './components/atoms/SubNavigation';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/community"
          element={<SubNavigation channel="community" />}
        >
          <Route index element={<div>전체 커뮤니티</div>} />
          <Route path="daily" element={<div>일상공유</div>} />
          <Route path="develop" element={<div>개발일지</div>} />
          <Route path="employ" element={<div>취업정보</div>} />
          <Route path="recruit" element={<div>팀원모집</div>} />
        </Route>

        <Route path="/question" element={<SubNavigation channel="question" />}>
          <Route index element={<div>전체 질문</div>} />
          <Route path="solved" element={<div>미해결 질문</div>} />
          <Route path="unsolved" element={<div>해결 완료</div>} />
        </Route>
        <Route path="/users" element={<SubNavigation channel="users" />}>
          <Route index element={<div>전체</div>} />
          <Route path="online" element={<div>온라인</div>} />
          <Route path="offline" element={<div>오프라인</div>} />
        </Route>
        <Route
          path="/userPage/:username"
          element={<SubNavigation channel="userPage" />}
        >
          <Route index element={<div>유저 프로필</div>} />
          <Route path="questions" element={<div>유저의 질문</div>} />
          <Route path="comments" element={<div>유저의 댓글</div>} />
          <Route path="likes" element={<div>유저의 좋아요</div>} />
        </Route>

        <Route path="/me" element={<SubNavigation channel="me" />}>
          <Route index element={<div>내 프로필</div>} />
          <Route path="questions" element={<div>내 질문</div>} />
          <Route path="comments" element={<div>내 댓글</div>} />
          <Route path="likes" element={<div>내 좋아요</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
