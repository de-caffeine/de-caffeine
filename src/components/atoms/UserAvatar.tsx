import defaultAvatar from "../../images/User.jpg";

interface UserAvatarProps {
  imageUrl?: string;
  size?: number;
}

// props로 imageurl이 안들어올시 defaultAvatar 출력
export default function UserAvatar({ imageUrl, size = 24 }: UserAvatarProps) {
  return (
    <img
      src={imageUrl || defaultAvatar}
      alt="유저 아바타"
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
}
