import Icon from './Icon';
import { useState } from "react";
import { likePost, unlikePost } from "../../api/likes";

export default function Interest({
  _id,
  commentCount = 0,
  like
}: {
  _id: string;
  commentCount: number;
  like: {
    likeCount: number;
    isLike: boolean;
  }
}) {
  const [isLike, setIsLike] = useState(like.isLike);
  const [likeCount, setLikeCount] = useState(like.likeCount);

  const LikeEventHandler = () => {
    if (isLike) {
      likePost(_id);
      setLikeCount((likeCount) => likeCount - 1);
    }
    else {
      unlikePost(_id);
      setLikeCount((likeCount) => likeCount + 1);
    }
    setIsLike((isLike) => !isLike);
  }

  return (
    <>
      <div className="flex items-center space-x-2 text-xs">
        <div className="flex items-center space-x-1">
          <Icon name="commentIcon" size={20} /> <span>{commentCount}</span>
        </div>
        <button className="flex items-center space-x-1 cursor-pointer" onClick={LikeEventHandler}>
          {isLike && <Icon name="likeIcon" size={20} color="red"/>}
          {isLike === false && <Icon name="unlikeIcon" size={20} />}
          <span>{likeCount}</span>
        </button>
      </div>
    </>
  );
}
