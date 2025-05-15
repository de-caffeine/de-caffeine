import CommunityCard from '../molecules/CommunityCard';
import QuestionCard from '../molecules/QuestionCard';
import { getPostsByChannel } from '../../api/posts';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FloatingButton from '../atoms/FloatingButton';
import Icon from '../atoms/Icon';
import { getAuthUser } from '../../api/auth';

export default function Main() {
  const [communityPosts, setCommunityPosts] = useState<Post[]>([]); // 출력할 커뮤니티 posts
  const [questionPosts, setQuestionPosts] = useState<Post[]>([]); // 출력할 코드질문 posts
  const [myInfo, setMyInfo] = useState<User | null>(); // 사용자 정보
  const [width, setWidth] = useState(window.innerWidth); // 반응형 width

  /* 최초 실행때 myInfo 저장, posts fetch */
  useEffect(() => {
    const getMyInfo = async () => {
      setMyInfo(await getAuthUser());
    };
    getMyInfo();

    const fetchCommunityPosts = async () => {
      const daily = await getPostsByChannel('681d9fee7ffa911fa118e4b5');
      const develop = await getPostsByChannel('681da0077ffa911fa118e4ba');
      const employ = await getPostsByChannel('681da0247ffa911fa118e4be');
      const recruit = await getPostsByChannel('681da0307ffa911fa118e4c2');
      setCommunityPosts(
        [...daily, ...develop, ...employ, ...recruit]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .sort((a, b) => b.likes.length - a.likes.length),
      );
    };
    const fetchQuestionPosts = async () => {
      const solved = await getPostsByChannel('681da03c7ffa911fa118e4c6');
      const unsolved = await getPostsByChannel('681da0447ffa911fa118e4ca');
      setQuestionPosts(
        [...solved, ...unsolved].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      );
    };

    fetchCommunityPosts();
    fetchQuestionPosts();
  }, []);

  /* 반응형 출력 */
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

  return (
    <>
      <div className="w-[270px] sm:w-[270px] md:w-[555px] lg:w-[840px] xl:w-[1125px]">
        <div className="flex flex-col">
          <div className="nanum-gothic-regular flex justify-between py-[5px]">
            <h2>커뮤니티 인기글 🔥</h2>
            <Link to="/community">
              <Icon name="rightIcon"></Icon>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-[15px]">
            {printCommunityPosts.length !== 0 ? (
              printCommunityPosts.map((post) => {
                const like = myInfo?.likes?.find(
                  (like) => like.post === post._id,
                );
                const likeId = like ? like._id : null;

                return (
                  <CommunityCard key={post._id} post={post} likeId={likeId} />
                );
              })
            ) : (
              <p className="nanum-gothic-regular text-base text-[#ababab]">
                앗! 아직 작성된 게시물이 없어요!
              </p>
            )}
          </div>
        </div>

        <div className="my-[20px] flex flex-col">
          <div className="nanum-gothic-regular flex justify-between py-[5px]">
            <h2>코드질문 최신글 💦</h2>
            <Link to="/question">
              <Icon name="rightIcon"></Icon>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-[15px]">
            {questionPosts.length !== 0 ? (
              questionPosts.map((post) => {
                const like = myInfo?.likes?.find(
                  (like) => like.post === post._id,
                );
                const likeId = like ? like._id : null;

                return (
                  <QuestionCard key={post._id} post={post} likeId={likeId} />
                );
              })
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
