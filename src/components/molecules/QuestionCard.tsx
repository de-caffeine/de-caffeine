import Tag from '../atoms/Tag';
import Icon from '../atoms/Icon';
import Info from '../atoms/Info';
import Interest from '../atoms/Interest';
import { Link } from 'react-router-dom';

export default function QuestionCard({ post }: { post: Post }) {
  return (
    <div className="flex h-[182px] w-[100%] flex-col justify-between rounded-[5px] border border-[#d9d9d9]">
      <Link to={`/post/${post._id}`}>
        <div className="flex flex-col p-[15px]">
          <div className="inline-flex w-[100%] gap-[5px]">
            <span className="nanum-gothic-bold max-w-[70%] overflow-hidden text-base break-all text-ellipsis whitespace-nowrap">
              {JSON.parse(post.title).title}
            </span>
            {post.channel.description === '해결완료' && (
              <Icon name="completeIcon" size={20} />
            )}
          </div>
          <div className="nanum-gothic-regular line-clamp-2 text-sm text-[#000000]">
            {JSON.parse(post.title).body}
          </div>
          <div className="mb-[10px] flex gap-[5px]">
            {JSON.parse(post.title)
              .tag.split(',')
              .map((t: string) => (
                <Tag>{t}</Tag>
              ))}
          </div>
        </div>
      </Link>
      <div className="mx-[10px] flex flex-row items-center justify-between border-t border-[#d9d9d9] px-[5px] py-[10px]">
        <Info
          size={30}
          userName={post.author.fullName}
          timestamp={post.createdAt}
          imageUrl={post.author.image}
        />
        <Interest
          commentCount={post.comments.length}
          like={{ likeCount: post.likes.length, isLike: false }}
          _id={post._id}
        />
      </div>
    </div>
  );
}
