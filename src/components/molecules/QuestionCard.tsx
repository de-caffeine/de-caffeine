import Tag from '../atoms/Tag';
import Icon from '../atoms/Icon';
import Info from '../atoms/Info';
import Interest from '../atoms/Interest';

interface QuestionCardProps {
  title: string;
  content: string;
  tags: string[];
  name: string;
  ImgUrl?: string;
  timestamp: string | number | Date;
  solved: boolean;
  commentCount: number;
  likeCount: number;
  isLike: boolean;
}

export default function QuestionCard({
  title,
  content,
  tags,
  name,
  ImgUrl,
  timestamp,
  solved,
  commentCount,
  likeCount,
  isLike,
}: QuestionCardProps) {
  return (
    <div className="mx-auto h-[182px] w-[978px] rounded-[5px] border border-[#d9d9d9] p-[16px]">
      <div className="mb-1 flex items-center">
        <span className="nanum-gothic-bold mr-1 line-clamp-1 text-base text-[#000000]">
          {title}
        </span>
        {/* solved가 true일 때 해결아이콘 */}
        {solved && <Icon name="completeIcon" size={24} />}
      </div>
      <div className="nanum-gothic-regular mb-2 line-clamp-2 text-sm text-[#000000]">
        {content}
      </div>
      <div className="mb-[10px] flex gap-[5px]">
        {tags
          .slice(0, 2)
          .map(
            (t) =>
              t.trim() !== '' && (
                <Tag className="">{t.trim().toUpperCase()}</Tag>
              ),
          )}
      </div>
      <div className="flex items-center justify-between border-t border-[#d9d9d9] pt-[6px]">
        <Info imageUrl={ImgUrl} timestamp={timestamp} name={name} />
        <Interest
          commentCount={commentCount}
          likeCount={likeCount}
          isLike={isLike}
        />
      </div>
    </div>
  );
}
