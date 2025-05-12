import CommunityCard from '../molecules/CommunityCard';
import { getPostsByChannel } from '../../api/posts';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FloatingButton from '../atoms/FloatingButton';

export default function Community() {
  const location = useLocation();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async (channelId: string) => {
      const posts = await getPostsByChannel(channelId);
      setPosts(posts);
    };

    const fetchAllPosts = async () => {
      const daily = await getPostsByChannel('681d9fee7ffa911fa118e4b5');
      const develop = await getPostsByChannel('681da0077ffa911fa118e4ba');
      const employ = await getPostsByChannel('681da0247ffa911fa118e4be');
      const recruit = await getPostsByChannel('681da0307ffa911fa118e4c2');
      setPosts(
        [...daily, ...develop, ...employ, ...recruit].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      );
    };

    switch (location.pathname) {
      case '/community': {
        fetchAllPosts();
        break;
      }
      case '/community/daily': {
        fetchPosts('681d9fee7ffa911fa118e4b5');
        break;
      }
      case '/community/develop': {
        fetchPosts('681da0077ffa911fa118e4ba');
        break;
      }
      case '/community/employ': {
        fetchPosts('681da0247ffa911fa118e4be');
        break;
      }
      case '/community/recruit': {
        fetchPosts('681da0307ffa911fa118e4c2');
        break;
      }
    }
  }, [location.pathname]);

  return (
    <>
      <div className="mb-[20px] flex w-[270px] flex-wrap justify-center gap-[15px] sm:w-[270px] md:w-[555px] lg:w-[840px] xl:w-[1125px]">
        {posts.length !== 0 ? (
          posts.map((post) => <CommunityCard key={post._id} post={post} />)
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
