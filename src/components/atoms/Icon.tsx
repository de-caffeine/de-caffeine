import alarmIcon from "../../assets/images/alarmIcon.png";
import chatIcon from "../../assets/images/chatIcon.png";
import mailIcon from "../../assets/images/mailIcon.png";
import githubIcon from "../../assets/images/githubIcon.png";
import velogIcon from "../../assets/images/velogIcon.png";
import homepageIcon from "../../assets/images/homepageIcon.png";
import completeIcon from "../../assets/images/completeIcon.png";
import completeNotIcon from "../../assets/images/completeNotIcon.png";
import comentsIcon from "../../assets/images/comentIcon.png";
import likeIcon from "../../assets/images/likeIcon.png";
import unlikeIcon from "../../assets/images/unlikeIcon.png";

export default function Icon({
  name,
  onClick,
  size = 24, // 기본 24
}: {
  name: string;
  onClick?: () => void;
  size?: number;
}) {
  const src =
    name === "alarmIcon"
      ? alarmIcon
      : name === "chatIcon"
      ? chatIcon
      : name === "mailIcon"
      ? mailIcon
      : name === "githubIcon"
      ? githubIcon
      : name === "velogIcon"
      ? velogIcon
      : name === "homepageIcon"
      ? homepageIcon
      : name === "completeIcon"
      ? completeIcon
      : name === "completeNotIcon"
      ? completeNotIcon
      : name === "comentsIcon"
      ? comentsIcon
      : name === "likeIcon"
      ? likeIcon
      : unlikeIcon;

  return (
    <>
      <button type="button" className="cursor-pointer" onClick={onClick}>
        <img src={src} alt={name} style={{ width: size, height: size }} />
      </button>
    </>
  );
}
