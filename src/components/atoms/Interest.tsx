import Icon from './Icon';
import { useState, useEffect } from 'react';
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
    isLike: boolean;
  };
}) {
  const [isLike, setIsLike] = useState(like.isLike);
  const [likeCount, setLikeCount] = useState(like.likeCount);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // 다크모드 클래스 감지
    const dark = document.documentElement.classList.contains('dark');
    setIsDarkMode(dark);
  }, []);

  const LikeEventHandler = () => {
    if (isLike) {
      likePost(_id);
      setLikeCount((likeCount) => likeCount - 1);
    } else {
      unlikePost(_id);
      setLikeCount((likeCount) => likeCount + 1);
    }
    setIsLike((isLike) => !isLike);
  };

  return (
    <div className="flex items-center space-x-2 text-xs dark:text-[#e0e0e0]">
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
        {isLike ? (
          <Icon name="likeIcon" size={20} color="red" />
        ) : (
          <Icon
            name="unlikeIcon"
            size={20}
            color={isDarkMode ? 'white' : 'black'}
          />
        )}
        <span>{likeCount}</span>
      </button>
    </div>
  );
}
