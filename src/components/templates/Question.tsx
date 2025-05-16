import QuestionCard from '../molecules/QuestionCard';
import { getPostsByChannel } from '../../api/posts';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FloatingButton from '../atoms/FloatingButton';
import { getAuthUser } from '../../api/auth';

export default function Question() {
  const location = useLocation(); // subChannel
  const [posts, setPosts] = useState<Post[]>([]); // 출력할 posts
  const [myInfo, setMyInfo] = useState<User | null>(); // 사용자 정보

  /* 최초 실행때 myInfo 저장 */
  useEffect(() => {
    const getMyInfo = async () => {
      setMyInfo(await getAuthUser());
    };
    getMyInfo();
  }, []);

  /* subChannel에 따라 fetch */
  useEffect(() => {
    /* 포스트 fetch 메소드 */
    const fetchPosts = async (channelId: string) => {
      const posts = await getPostsByChannel(channelId);
      setPosts(posts);
    };

    /* 전체 포스트 fetch 메소드 */
    const fetchAllPosts = async () => {
      const solved = await getPostsByChannel('681da03c7ffa911fa118e4c6');
      const unsolved = await getPostsByChannel('681da0447ffa911fa118e4ca');
      setPosts(
        [...solved, ...unsolved].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      );
    };

    switch (location.pathname) {
      case '/question': {
        fetchAllPosts();
        break;
      }
      case '/question/unsolved': {
        fetchPosts('681da0447ffa911fa118e4ca');
        break;
      }
      case '/question/solved': {
        fetchPosts('681da03c7ffa911fa118e4c6');
        break;
      }
    }
  }, [location.pathname]);

  return (
    <>
      <div className="wrapper card-list">
        {posts.length !== 0 ? (
          posts.map((post) => {
            const like = myInfo?.likes?.find((like) => like.post === post._id);
            const likeId = like ? like._id : null;

            return <QuestionCard key={post._id} post={post} likeId={likeId} />;
          })
        ) : (
          <p className="nanum-gothic-regular text-base text-[#ababab]">
            앗! 아직 작성된 게시물이 없어요!
          </p>
        )}
      </div>
      <Link to="/writer" className="fixed right-[10%] bottom-[5%]">
        <FloatingButton buttonType="write" />
      </Link>
    </>
  );
}
