import { Link } from "react-router-dom";
import Info from "../atoms/Info";
import Interest from "../atoms/Interest";
import Tag from "../atoms/Tag";
import LogoImage from "../../assets/images/logo.png"

// todo : Login 연결 후 isLike 동적으로 변경 필요함
export default function CommunityCard ( {post}: {post: Post} ) {
    return (
        <div className="w-[270px] h-[340px] border border-[#d9d9d9] rounded-[5px]">
          <Link to={`/post/${post._id}`}>
            <div className="relative m-between h-[55%] rounded-t-[5px]">
                {post.image ? <>
                  <img src={post.image} className="w-[100%] h-[100%] object-cover"/>
                </> : <>
                  <div className="flex gap-1 items-center justify-center w-[100%] h-[100%] cafe24 text-3xl bg-[#A9907E] leading-[0.9]">
                    <img src={LogoImage} className="w-auto h-[40%]"></img>
                    <p>de:<br/>caffeiene</p>
                  </div>
                </>}
                <Tag className="absolute bottom-[10px] right-[10px]">{post.channel.description}</Tag>
            </div>
          </Link>
          <div className="flex flex-col h-[45%] justify-between">
            <Link to={`/post/${post._id}`}>
              <div className="p-[15px] h-[90px]">
                <h3 className="nanum-gothic-bold text-base line-clamp-1 pr-[30px]">{JSON.parse(post.title).title}</h3>
                <p className="nanum-gothic-regular text-sm line-clamp-2">{JSON.parse(post.title).body}</p>
              </div>
            </Link>
            <div className="flex flex-row border-t border-[#d9d9d9] items-center justify-between mx-[10px] py-[10px] px-[5px]">
              <Info size={30} userName={post.author.fullName} timestamp={post.createdAt}/>
              <Interest commentCount={post.comments.length} like={{likeCount: post.likes.length, isLike: false}} _id={post._id}/>
            </div>
          </div>
        </div>
    );
  }