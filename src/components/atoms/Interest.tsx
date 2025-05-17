import { useEffect, useState } from 'react';
import Icon from './Icon';
import { likePost, unlikePost } from '../../api/likes';

export default function Interest({
  _id,
  commentCount = 0,
  like,
}: {
  _id: string;
  commentCount: number;
  like: {
    likeCount: number;
    likeId: string | null;
  };
}) {
  const [likeId, setLikeId] = useState(like.likeId);
  const [likeCount, setLikeCount] = useState(like.likeCount);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 다크모드 여부를 localStorage에서 가져오기
  useEffect(() => {
    const darkPref = localStorage.getItem('darkMode');
    setIsDarkMode(darkPref === 'true');
  }, [isDarkMode]);

  const LikeEventHandler = async () => {
    if (!likeId) {
      const newLikeId = await likePost(_id);
      setLikeId(newLikeId);
      setLikeCount((count) => count + 1);
    } else {
      await unlikePost(likeId!);
      setLikeId(null);
      setLikeCount((count) => count - 1);
    }
  };

  return (
    <div className="dark:text-dark-text flex items-center space-x-2 text-xs">
      <div className="flex items-center space-x-1">
        <Icon
          name="commentIcon"
          size={20}
          color={isDarkMode ? 'white' : 'black'}
        />
        <span>{commentCount}</span>
      </div>
      <button
        className="flex cursor-pointer items-center space-x-1"
        onClick={LikeEventHandler}
      >
        <Icon
          name={likeId ? 'likeIcon' : 'unlikeIcon'}
          size={20}
          color={likeId ? 'red' : isDarkMode ? 'white' : 'black'}
        />
        <span>{likeCount}</span>
      </button>
    </div>
  );
}
