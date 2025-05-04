import Icon from './Icon';

export default function Interest({ commentCount = 0, likeCount = 0 }) {
  return (
    <>
      <div className="flex items-center space-x-2 text-[#000000] text-[12px]">
        <div className="flex items-center space-x-1">
          <Icon name="commentIcon" size={20} /> <span>{commentCount}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="unlikeIcon" size={20} /> <span>{likeCount}</span>
        </div>
      </div>
    </>
  );
}
