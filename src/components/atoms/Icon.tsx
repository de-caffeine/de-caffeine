import alarmIcon from "../../assets/images/alarmIcon.png";
import chatIcon from "../../assets/images/chatIcon.png";
import mailIcon from "../../assets/images/mailIcon.png";
import githubIcon from "../../assets/images/githubIcon.png";
import velogIcon from "../../assets/images/velogIcon.png";
import homepageIcon from "../../assets/images/homepageIcon.png";
import completeIcon from "../../assets/images/completeIcon.png";
import completeNotIcon from "../../assets/images/completeNotIcon.png";

export default function Icon() {
  return (
    <>
      <button type="button" className="cursor-pointer">
        <img src={alarmIcon} alt="알림 아이콘" className="w-[34px] h-[34px]" />
      </button>

      <button type="button" className="cursor-pointer">
        <img src={chatIcon} alt="채팅 아이콘" className="w-[24px] h-[24px]" />
      </button>

      <button type="button" className="cursor-pointer">
        <img src={mailIcon} alt="메일 아이콘" className="w-[24px] h-[24px]" />
      </button>

      <button type="button" className="cursor-pointer">
        <img
          src={githubIcon}
          alt="깃허브 아이콘"
          className="w-[24px] h-[24px]"
        />
      </button>

      <button type="button" className="cursor-pointer">
        <img
          src={velogIcon}
          alt="벨로그주소 아이콘"
          className="w-[24px] h-[24px]"
        />
      </button>

      <button type="button" className="cursor-pointer">
        <img
          src={homepageIcon}
          alt="홈페이지주소 아이콘"
          className="w-[24px] h-[24px]"
        />
      </button>

      <button type="button" className="cursor-pointer">
        <img
          src={completeIcon}
          alt="완료 아이콘"
          className="w-[24px] h-[24px]"
        />
      </button>

      <button type="button" className="cursor-pointer">
        <img
          src={completeNotIcon}
          alt="미완료 아이콘"
          className="w-[24px] h-[24px]"
        />
      </button>
    </>
  );
}
