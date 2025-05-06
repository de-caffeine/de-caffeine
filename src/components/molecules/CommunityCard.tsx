import Info from "../atoms/Info";
import Interest from "../atoms/Interest";
import Tag from "../atoms/Tag";

interface PostType {
  post: {
    _id: string;
    image: string;
    title: string;
    content: string;
    channel: {
      _id: string;
      name: string;
    }
    user: {
      _id: string;
      fullName: string;
    }
    commentCount: number;
    likeCount: number;
    isLike: boolean;
    createAt: string;
  }
  
}
export default function CommunityCard ( {post}: PostType ) {
    return (
      <div className="w-[270px] h-[340px] border border-[#d9d9d9] rounded-[5px]">
        <div className="relative m-between h-[55%] bg-[#A9907E] rounded-t-[5px]">
            <img/>
            <Tag className="absolute bottom-[10px] right-[10px]">{post.channel.name}</Tag>
        </div>
        <div className="flex flex-col h-[45%] p-[10px] justify-between">
          <div className="p-[5px]">
            <h3 className="nanum-gothic-bold text-base line-clamp-1 pr-[30px]">{post.title}</h3>
            <p className="nanum-gothic-regular text-sm line-clamp-2">{post.content}</p>
          </div>
          <div className="flex flex-row border-t border-[#d9d9d9] items-center justify-between pt-[10px] px-[5px]">
            <Info size={30} userName={post.user.fullName} timestamp={post.createAt}/>
            <Interest commentCount={post.commentCount} likeCount={post.likeCount} isLike={post.isLike}/>
          </div>
        </div>
      </div>
    );
  }