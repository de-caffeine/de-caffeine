import { Route, Routes } from 'react-router-dom';
import Header from './components/organisms/Header';
import SubNavigation from './components/atoms/SubNavigation';
import Main from './components/templates/Main';
import NotFound from './components/templates/NotFound';
import Community from './components/templates/Community';
import Question from './components/templates/Question';
import Users from './components/templates/Users';
import Search from './components/templates/Search';
import Setting from './components/templates/Setting';
import MyPage from './components/templates/MyPage';
import Post from './components/templates/Post';
import Writer from './components/templates/Writer';
import UserPage from './components/templates/UserPage';

export default function App() {
  return (
    <>
      <div className="m-auto flex flex-col items-center">
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Main />} />
            <Route
              path="/community"
              element={<SubNavigation channel="community" />}
            >
              <Route index element={<Community />} />
              <Route path="daily" element={<Community />} />
              <Route path="develop" element={<Community />} />
              <Route path="employ" element={<Community />} />
              <Route path="recruit" element={<Community />} />
            </Route>

            <Route
              path="/question"
              element={<SubNavigation channel="question" />}
            >
              <Route index element={<Question />} />
              <Route path="solved" element={<Question />} />
              <Route path="unsolved" element={<Question />} />
            </Route>
            <Route path="/me" element={<SubNavigation channel="me" />}>
              <Route index element={<MyPage />} />
              <Route path="question" element={<MyPage />} />
              <Route path="comments" element={<MyPage />} />
              <Route path="liked" element={<MyPage />} />
            </Route>

            <Route path="/:userId" element={<SubNavigation channel="userId" />}>
              <Route index element={<UserPage />} />
              <Route path="question" element={<UserPage />} />
              <Route path="comments" element={<UserPage />} />
              <Route path="liked" element={<UserPage />} />
            </Route>

            <Route path="/users" element={<SubNavigation channel="users" />}>
              <Route index element={<Users />} />
              <Route path="online" element={<Users />} />
              <Route path="offline" element={<Users />} />
            </Route>

            <Route path="/post/:postId" element={<Post />} />
            <Route path="/writer" element={<Writer />} />

            <Route path="/search/:keyword" element={<Search />} />
            <Route path="/setting" element={<Setting />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
