import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getPostsByChannel } from '../../api/posts';
import { Link } from 'react-router-dom';
import FloatingButton from '../atoms/FloatingButton';
import Icon from '../atoms/Icon';
import CommunityCard from '../molecules/CommunityCard';
import QuestionCard from '../molecules/QuestionCard';
import UserCard from '../molecules/UserCard';
import { getUsers } from '../../api/users';

export default function Search() {
  const location = useLocation();
  const { keyword } = useParams();
  const [communityPosts, setCommunityPosts] = useState<Post[]>([]);
  const [questionPosts, setQuestionPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getVisibleCardCount =
    width < 768 ? 1 : width < 1024 ? 2 : width < 1280 ? 3 : 4;
  const printCommunityPosts = communityPosts.slice(0, getVisibleCardCount);

  useEffect(() => {
    const fetchCommunityPosts = async () => {
      const daily = await getPostsByChannel('681d9fee7ffa911fa118e4b5');
      const develop = await getPostsByChannel('681da0077ffa911fa118e4ba');
      const employ = await getPostsByChannel('681da0247ffa911fa118e4be');
      const recruit = await getPostsByChannel('681da0307ffa911fa118e4c2');
      setCommunityPosts(
        [...daily, ...develop, ...employ, ...recruit]
          .filter(
            (post) =>
              JSON.parse(post.title).title.includes(keyword) ||
              JSON.parse(post.title).body.includes(keyword),
          )
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          ),
      );
    };
    const fetchQuestionPosts = async () => {
      const solved = await getPostsByChannel('681da03c7ffa911fa118e4c6');
      const unsolved = await getPostsByChannel('681da0447ffa911fa118e4ca');
      setQuestionPosts(
        [...solved, ...unsolved]
          .filter(
            (post) =>
              JSON.parse(post.title).title.includes(keyword) ||
              JSON.parse(post.title).body.includes(keyword),
          )
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          ),
      );
    };
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users.filter((user: User) => user.fullName.includes(keyword!)));
    };

    fetchCommunityPosts();
    fetchQuestionPosts();
    fetchUsers();
  }, [keyword]);

  switch (location.pathname.split('/')[3]) {
    case undefined: {
      return (
        <>
          <div className="w-[270px] sm:w-[270px] md:w-[555px] lg:w-[840px] xl:w-[1125px]">
            <div className="flex flex-col">
              <div className="nanum-gothic-regular flex justify-between py-[5px]">
                <h2>"{keyword}" 커뮤니티 검색 결과</h2>
                <Link to={`/search/${keyword}/community`}>
                  <Icon name="rightIcon"></Icon>
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-[15px]">
                {printCommunityPosts.length !== 0 ? (
                  printCommunityPosts.map((post) => (
                    <CommunityCard key={post._id} post={post} />
                  ))
                ) : (
                  <p className="nanum-gothic-regular text-base text-[#ababab]">
                    앗! "{keyword}"을 포함한 게시물이 없어요!
                  </p>
                )}
              </div>
            </div>

            <div className="my-[20px] flex flex-col">
              <div className="nanum-gothic-regular flex justify-between py-[5px]">
                <h2>"{keyword}" 코드질문 검색 결과</h2>
                <Link to={`/search/${keyword}/question`}>
                  <Icon name="rightIcon"></Icon>
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-[15px]">
                {questionPosts.length !== 0 ? (
                  questionPosts.map((post) => (
                    <QuestionCard key={post._id} post={post} />
                  ))
                ) : (
                  <p className="nanum-gothic-regular text-base text-[#ababab]">
                    앗! "{keyword}"을 포함한 게시물이 없어요!
                  </p>
                )}
              </div>
            </div>

            <div className="my-[20px] flex flex-col">
              <div className="nanum-gothic-regular flex justify-between py-[5px]">
                <h2>"{keyword}" 유저 검색 결과</h2>
                <Link to={`/search/${keyword}/user`}>
                  <Icon name="rightIcon"></Icon>
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-[15px]">
                {users.length !== 0 ? (
                  users.map((user) => (
                    <UserCard
                      key={user._id}
                      UName={user.fullName}
                      followCount={user.following.length}
                      followerCount={user.followers.length}
                      tags={
                        user.username
                          ? JSON.parse(user.username).tags
                            ? JSON.parse(user.username).tags
                            : []
                          : []
                      }
                      imgUrl={user.image}
                      loginStatus={user.isOnline ? 'online' : 'offline'}
                    ></UserCard>
                  ))
                ) : (
                  <p className="nanum-gothic-regular text-base text-[#ababab]">
                    앗! "{keyword}"을 포함한 사용자가 없어요!
                  </p>
                )}
              </div>
            </div>
          </div>

          <Link to="/writer" className="fixed right-[10%] bottom-[5%]">
            <FloatingButton buttonType="write" />
          </Link>
        </>
      );
    }
    case 'community': {
      return (
        <>
          <div className="w-[270px] sm:w-[270px] md:w-[555px] lg:w-[840px] xl:w-[1125px]">
            <div className="flex flex-col">
              <div className="nanum-gothic-regular flex justify-between py-[5px]">
                <h2>"{keyword}" 커뮤니티 검색 결과</h2>
              </div>
              <div className="flex flex-wrap justify-center gap-[15px]">
                {printCommunityPosts.length !== 0 ? (
                  printCommunityPosts.map((post) => (
                    <CommunityCard key={post._id} post={post} />
                  ))
                ) : (
                  <p className="nanum-gothic-regular text-base text-[#ababab]">
                    앗! 아직 작성된 게시물이 없어요!
                  </p>
                )}
              </div>
            </div>
          </div>
          <Link to="/writer" className="fixed right-[10%] bottom-[5%]">
            <FloatingButton buttonType="write" />
          </Link>
        </>
      );
    }
    case 'question': {
      return (
        <>
          <div className="w-[270px] sm:w-[270px] md:w-[555px] lg:w-[840px] xl:w-[1125px]">
            <div className="my-[20px] flex flex-col">
              <div className="nanum-gothic-regular flex justify-between py-[5px]">
                <h2>"{keyword}" 코드질문 검색 결과</h2>
              </div>
              <div className="flex flex-wrap justify-center gap-[15px]">
                {questionPosts.length !== 0 ? (
                  questionPosts.map((post) => (
                    <QuestionCard key={post._id} post={post} />
                  ))
                ) : (
                  <p className="nanum-gothic-regular text-base text-[#ababab]">
                    앗! 아직 작성된 게시물이 없어요!
                  </p>
                )}
              </div>
            </div>
          </div>
          <Link to="/writer" className="fixed right-[10%] bottom-[5%]">
            <FloatingButton buttonType="write" />
          </Link>
        </>
      );
    }
    case 'user': {
      return (
        <>
          <div className="w-[270px] sm:w-[270px] md:w-[555px] lg:w-[840px] xl:w-[1125px]">
            <div className="my-[20px] flex flex-col">
              <div className="nanum-gothic-regular flex justify-between py-[5px]">
                <h2>"{keyword}" 유저 검색 결과</h2>
              </div>
              <div className="flex flex-wrap justify-center gap-[15px]">
                {users.length !== 0 ? (
                  users.map((user) => (
                    <UserCard
                      key={user._id}
                      UName={user.fullName}
                      followCount={user.following.length}
                      followerCount={user.followers.length}
                      tags={
                        user.username
                          ? JSON.parse(user.username).tags
                            ? JSON.parse(user.username).tags
                            : []
                          : []
                      }
                      imgUrl={user.image}
                      loginStatus={user.isOnline ? 'online' : 'offline'}
                    ></UserCard>
                  ))
                ) : (
                  <p className="nanum-gothic-regular text-base text-[#ababab]">
                    앗! "{keyword}"을 포함한 사용자가 없어요!
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}
