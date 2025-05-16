import Icon from './Icon';
import { useState } from 'react';
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
  const [likeId, setlikeId] = useState(like.likeId);
  const [likeCount, setLikeCount] = useState(like.likeCount);

  // 다크모드 감지 (선택 사항)
  const isDarkMode = window.matchMedia?.(
    '(prefers-color-scheme: dark)',
  ).matches;

  const LikeEventHandler = async () => {
    if (!likeId) {
      const newLikeId = await likePost(_id);
      setlikeId(newLikeId);
      setLikeCount((likeCount) => likeCount + 1);
    } else {
      await unlikePost(likeId!);
      setlikeId(null);
      setLikeCount((likeCount) => likeCount - 1);
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
          color={isDarkMode ? 'white' : 'black'}
        />
        <span>{likeCount}</span>
      </button>
    </div>
  );
}
