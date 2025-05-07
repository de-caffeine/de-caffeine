import { Link } from "react-router-dom";
import Info from "../atoms/Info";
import Interest from "../atoms/Interest";
import Tag from "../atoms/Tag";
import { useState } from "react";
import { likePost, unlikePost } from "../../api/likes";

interface CommunityCard {
  post: {
    _id: string;
    image: string | undefined;
    channelName: string;
    title: string;
    body: string;
    userName: string;
    createAt: string;
    commentCount: number;
    likeCount: number;
    isLike: boolean;
  }
}

// todo : 기본이미지 작업
export default function CommunityCard ( {post}: CommunityCard ) {
  const [isLike, setIsLike] = useState(post.isLike);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  const LikeEventHandler = () => {
    if (isLike) {
      likePost(post._id);
      setLikeCount((likeCount) => likeCount - 1);
    }
    else {
      unlikePost(post._id);
      setLikeCount((likeCount) => likeCount + 1);
    }
    setIsLike((isLike) => !isLike);
  }

    return (
        <div className="w-[270px] h-[340px] border border-[#d9d9d9] rounded-[5px]">
          <Link to={`/post/${post._id}`}>
            <div className="relative m-between h-[55%] bg-[#A9907E] rounded-t-[5px]">
                <img src={post.image} className="w-[100%] h-[100%] object-cover"/>
                <Tag className="absolute bottom-[10px] right-[10px]">{post.channelName}</Tag>
            </div>
          </Link>
          <div className="flex flex-col h-[45%] p-[10px] justify-between">
            <Link to={`/post/${post._id}`}>
              <div className="p-[5px]">
                <h3 className="nanum-gothic-bold text-base line-clamp-1 pr-[30px]">{post.title}</h3>
                <p className="nanum-gothic-regular text-sm line-clamp-2">{post.body}</p>
              </div>
            </Link>
            <div className="flex flex-row border-t border-[#d9d9d9] items-center justify-between pt-[10px] px-[5px]">
              <Info size={30} userName={post.userName} timestamp={post.createAt}/>
              <Interest commentCount={post.commentCount} likeCount={likeCount} isLike={isLike} onClick={LikeEventHandler}/>
            </div>
          </div>
        </div>
    );
  }