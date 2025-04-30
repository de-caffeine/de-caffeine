export default function Icon({ name }: { name: "alarm" | "chat" }) {
  return (
    <button>
      <img
        src={`/src/assets/images/Icon${
          name === "alarm" ? "Alram" : "Chat"
        }.png`}
        alt={name}
        className={name === "alarm" ? "w-[34px] h-[34px]" : "w-[24px] h-[24px]"}
      />
    </button>
  );
}
