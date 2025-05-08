import { Link } from 'react-router-dom';
import Info from '../atoms/Info';
import Interest from '../atoms/Interest';
import Tag from '../atoms/Tag';
import LogoImage from '../../assets/images/logo.png';

// todo : Login 연결 후 isLike 동적으로 변경 필요함
export default function CommunityCard({ post }: { post: Post }) {
  return (
    <div className="h-[340px] w-[270px] rounded-[5px] border border-[#d9d9d9]">
      <Link to={`/post/${post._id}`}>
        <div className="m-between relative h-[55%] rounded-t-[5px]">
          {post.image ? (
            <>
              <img
                src={post.image}
                className="h-[100%] w-[100%] object-cover"
              />
            </>
          ) : (
            <>
              <div className="cafe24 flex h-[100%] w-[100%] items-center justify-center gap-1 bg-[#A9907E] text-3xl leading-[0.9]">
                <img src={LogoImage} className="h-[40%] w-auto"></img>
                <p>
                  de:
                  <br />
                  caffeiene
                </p>
              </div>
            </>
          )}
          <div className="absolute right-[10px] bottom-[10px]">
            <Tag>{post.channel.description}</Tag>
          </div>
        </div>
      </Link>
      <div className="flex h-[45%] flex-col justify-between">
        <Link to={`/post/${post._id}`}>
          <div className="h-[90px] p-[15px]">
            <h3 className="nanum-gothic-bold line-clamp-1 pr-[30px] text-base">
              {JSON.parse(post.title).title}
            </h3>
            <p className="nanum-gothic-regular line-clamp-2 text-sm">
              {JSON.parse(post.title).body}
            </p>
          </div>
        </Link>
        <div className="mx-[10px] flex flex-row items-center justify-between border-t border-[#d9d9d9] px-[5px] py-[10px]">
          <Info
            size={30}
            userName={post.author.fullName}
            timestamp={post.createdAt}
          />
          <Interest
            commentCount={post.comments.length}
            like={{ likeCount: post.likes.length, isLike: false }}
            _id={post._id}
          />
        </div>
      </div>
    </div>
  );
}
