import Link from "next/link";
import Button from "./Button";

const SelectSuggestedArtists = ({
  options,
  handleAdd,
  handleContinue,
  heading,
}) => {
  return (
    <>
      <p className="text-sm my-1">
        {"Remove artists you do not want by clicking them..."}
      </p>
      <div className="space-x-2 px-1 md:w-2/5 flex flex-row flex-wrap justify-center items-center">
        {options.map((opt) => (
          <Button
            handleAdd={handleAdd}
            id={opt.id}
            name={opt.name}
            key={opt.id}
            url={opt.url}
            initial={true}
          />
        ))}

        <div className="space-x-2  flex flex-row w-full justify-center pb-16">
          <Link href={"/playlists"}>
            <a className="py-2 px-5 text-xs text-red-600 my-4">Cancel</a>
          </Link>
          <button
            onClick={handleContinue}
            className="py-2 px-5 text-xs  bg-[#f43b3b] my-4 text-white"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};
export default SelectSuggestedArtists;
