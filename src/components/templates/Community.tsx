import CommunityCard from '../molecules/CommunityCard';
import { getPostsByChannel } from '../../api/posts';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Community() {
  const location = useLocation();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async (channelId: string) => {
      const posts = await getPostsByChannel(channelId);
      setPosts(posts);
    };

    const fetchAllPosts = async () => {
      const daily = await getPostsByChannel('681b6760bd535b296ed6fffc');
      const develop = await getPostsByChannel('681b663760d7dc2aa8be1393');
      const employ = await getPostsByChannel('681b669660d7dc2aa8be139b');
      const recruit = await getPostsByChannel('681b66c660d7dc2aa8be139f');
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
        fetchPosts('681b6760bd535b296ed6fffc');
        break;
      }
      case '/community/develop': {
        fetchPosts('681b663760d7dc2aa8be1393');
        break;
      }
      case '/community/employ': {
        fetchPosts('681b669660d7dc2aa8be139b');
        break;
      }
      case '/community/recruit': {
        fetchPosts('681b66c660d7dc2aa8be139f');
        break;
      }
    }
  }, [location.pathname]);

  return (
    <>
      <div className="flex w-[90%] max-w-[1125px] min-w-[270px] flex-wrap justify-center gap-[15px]">
        {posts.length !== 0 ? (
          posts.map((post) => <CommunityCard key={post._id} post={post} />)
        ) : (
          <p className="nanum-gothic-regular text-base text-[#ababab]">
            앗! 아직 작성된 게시물이 없어요!
          </p>
        )}
      </div>
    </>
  );
}
