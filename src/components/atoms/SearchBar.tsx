import searchIcon from '../../assets/images/searchIcon.png';

export default function SearchBar() {
  return (
    <>
      <div className="relative w-[400px] border-b border-[#ababab]">
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          className="text-[12px] w-[400px] pl-2 py-2 text-[#ababab] placeholder-[#ababab] focus:outline-none"
        />
        <img
          src={searchIcon}
          alt="검색 아이콘"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 mr-2"
        />
      </div>
    </>
  );
}
