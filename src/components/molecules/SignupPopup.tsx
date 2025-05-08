export default function SignupPopup() {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div className="relative rounded-lg bg-white p-5 shadow-inner">
          <button className="absolute top-1 right-1 h-5 w-5">✕</button>
          <p>모달 내용</p>
        </div>
      </div>
    </>
  );
}
