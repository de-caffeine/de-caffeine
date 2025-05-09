import QuestionCard from '../molecules/QuestionCard';
import { getPostsByChannel } from '../../api/posts';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FloatingButton from '../atoms/FloatingButton';

export default function Question() {
  const location = useLocation();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async (channelId: string) => {
      const posts = await getPostsByChannel(channelId);
      setPosts(posts);
    };

    const fetchAllPosts = async () => {
      const solved = await getPostsByChannel('681b66f960d7dc2aa8be13a8');
      const unsolved = await getPostsByChannel('681b66f060d7dc2aa8be13a3');
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
        fetchPosts('681b66f960d7dc2aa8be13a8');
        break;
      }
      case '/question/solved': {
        fetchPosts('681b66f060d7dc2aa8be13a3');
        break;
      }
    }
  }, [location.pathname]);

  return (
    <>
      <div className="flex w-[260px] flex-wrap justify-center gap-[15px] sm:w-[260px] md:w-[535px] lg:w-[810px] xl:w-[1125px]">
        {posts.length !== 0 ? (
          posts.map((post) => <QuestionCard key={post._id} post={post} />)
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
