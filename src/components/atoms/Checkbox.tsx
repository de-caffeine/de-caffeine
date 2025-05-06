export default function Checkbox() {
    return (
        <>
            <input
                type="checkbox"
                className="
                    appearance-none w-[24px] h-[24px] border rounded-[5px]
                    checked:bg-[#6B4C36] checked:border-[#6B4C36] checked:bg-[url('../images/check_icon.png')] checked:bg-center
                    "
            ></input>
        </>
    );
}
