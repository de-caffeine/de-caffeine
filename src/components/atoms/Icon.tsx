import alarmIcon from "../../assets/images/alarmIcon.png";
import chatIcon from "../../assets/images/chatIcon.png";
import mailIcon from "../../assets/images/mailIcon.png";
import githubIcon from "../../assets/images/githubIcon.png";
import velogIcon from "../../assets/images/velogIcon.png";
import homepageIcon from "../../assets/images/homepageIcon.png";
import completeIcon from "../../assets/images/completeIcon.png";
import completeNotIcon from "../../assets/images/completeNotIcon.png";

export default function Icon({
  name,
}: {
  name:
    | "alarmIcon"
    | "chatIcon"
    | "mailIcon"
    | "githubIcon"
    | "velogIcon"
    | "homepageIcon"
    | "completeIcon"
    | "completeNotIcon";
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
      : completeNotIcon;

  const className =
    name === "alarmIcon" ? "w-[34px] h-[34px]" : "w-[24px] h-[24px]";

  return (
    <>
      <button type="button" className="cursor-pointer">
        <img src={src} alt={name} className={className} />
      </button>
    </>
  );
}
