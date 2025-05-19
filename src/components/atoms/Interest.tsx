import Icon from './Icon';
import { likePost, unlikePost } from '../../api/likes';
import { useLoginStore } from '../../stores/loginStore';

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
  const setRefetch = useLoginStore((state) => state.setRefetch);
  const LikeEventHandler = async () => {
    if (!like.likeId) {
      await likePost(_id);
    } else {
      await unlikePost(like.likeId!);
    }
    setRefetch();
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
          {like.likeId ? (
            <Icon name="likeIcon" size={20} color="red" />
          ) : (
            <Icon name="unlikeIcon" size={20} />
          )}
          <span>{like.likeCount}</span>
        </button>
      </div>
    </>
  );
}
