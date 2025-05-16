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
    <>
      <div className="flex items-center space-x-2 text-xs">
        <div className="flex items-center space-x-1">
          <Icon name="commentIcon" size={20} /> <span>{commentCount}</span>
        </div>
        <button
          className="flex cursor-pointer items-center space-x-1"
          onClick={LikeEventHandler}
        >
          {likeId ? (
            <Icon name="likeIcon" size={20} color="red" />
          ) : (
            <Icon name="unlikeIcon" size={20} />
          )}
          <span>{likeCount}</span>
        </button>
      </div>
    </>
  );
}
