import Icon from '../atoms/Icon';
import UserAvatar from '../atoms/UserAvatar';

export default function Setting() {
  return (
    <>
      <div className="mb-[10px] ml-[42px] flex w-[950px]">
        <Icon name="leftIcon" />
        <div className="nanum-gothic-regular ml-[20px]">설정</div>
      </div>
      <div className="w-[950px] rounded-[5px] border border-[#ababab]">
        <div className="mt-[38px] ml-[70px] flex items-baseline">
          <UserAvatar size={120} />
          <button className="ml-[38px] h-[28px] w-[94px] cursor-pointer rounded-[5px] bg-[#A9907E] text-[13px] text-white">
            이미지 업로드
          </button>
          <button className="ml-[9px] h-[28px] w-[94px] cursor-pointer rounded-[5px] border text-[13px]">
            이미지 삭제
          </button>
        </div>
        <hr className="m-5 border-t border-[#ababab]" />
        <div className="mt-[28px] ml-[70px] justify-start">
          <div className="mt-[22px]">
            <div className="nanum-gothic-bold mb-[5px]">닉네임</div>
            <input
              type="text"
              placeholder="설정할 닉네임을 입력해주세요."
              className="h-[38px] w-[255px] rounded-[5px] border p-3 text-[12px]"
            />
          </div>
          <div className="mt-[22px]">
            <div className="nanum-gothic-bold mb-[5px]">한 줄 소개</div>
            <input
              type="text"
              placeholder="한 줄로 나를 소개해 보세요!"
              className="h-[38px] w-[520px] rounded-[5px] border p-3 text-[12px]"
            />
          </div>
          <div className="mt-[22px]">
            <div className="nanum-gothic-bold mb-[5px]">기술 스택</div>
            <input
              type="text"
              placeholder="어떤 기술 스택을 가지고 있나요?"
              className="h-[38px] w-[520px] rounded-[5px] border p-3 text-[12px]"
            />
          </div>
          <div className="mt-[22px] mb-[45px]">
            <div className="nanum-gothic-bold mb-[5px]">소셜 정보</div>
            <input
              type="text"
              placeholder="설정할 닉네임을 입력해주세요."
              className="h-[38px] w-[255px] rounded-[5px] border p-3 text-[12px]"
            />
          </div>
        </div>
        <button></button>
      </div>
    </>
  );
}
