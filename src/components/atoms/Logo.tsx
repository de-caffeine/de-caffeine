import '../../css/font.css';
export default function Logo() {
  return (
    <>
      <div className="inline-block cursor-pointer text-center">
        <h1 className="cafe24 text-[28px] leading-none dark:text-[#e0e0e0]">
          de:caffeine
        </h1>
        <span className="nanum-gothic-regular float-left pl-[12px] text-[16px] leading-none text-[#977A65]">
          개발자들의 카페인
        </span>
      </div>
    </>
  );
}
