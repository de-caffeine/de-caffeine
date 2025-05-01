interface TagProps {
  value: string;
}
export default function Tag({ value }: TagProps) {
  return (
    <>
      <span className="nanum-gothic-regular inline-flex items-center rounded-[2px] bg-[#D7CAB9] px-[9px] pt-[5px] pb-[6px] text-[12px]">
        {value}
      </span>
    </>
  );
}
