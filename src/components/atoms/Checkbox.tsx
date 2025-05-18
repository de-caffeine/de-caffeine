export default function Checkbox({ id }: { id?: string }) {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        className="cursor-pointer accent-[#6b4c36]"
      ></input>
    </>
  );
}
