import Link from "next/link";
import Button from "./Button";

const Select = ({ options, handleAdd, handleContinue, heading }) => {
  return (
    <>
      <p className="text-sm my-1 mb-2 text-left">{heading}</p>
      <div className="gap-x-2 px-1 md:w-2/5 flex flex-row flex-wrap md:justify-center md:items-center">
        {options.map((opt) => (
          <Button
            handleAdd={handleAdd}
            id={opt.id}
            name={opt.name}
            key={opt.id}
            url={opt.url}
          />
        ))}

        <div className="space-x-2  flex flex-row w-full justify-center pb-16">
          <Link href={"/playlists"}>
            <a className="py-2 px-5 text-xs border text-red-600  border-[red] my-4">
              Cancel
            </a>
          </Link>
          <button
            onClick={handleContinue}
            className="py-2 px-5 text-xs  bg-[#1db954] my-4"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};
export default Select;
