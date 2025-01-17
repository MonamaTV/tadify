import Link from "next/link";
import Button from "./Button";

const SelectRecommendedTracks = ({
  options,
  handleAdd,
  handleContinue,
  heading,
}) => {
  return (
    <>
      <p className="text-sm my-1">{heading}</p>
      <div className="gap-x-2 px-1 md:w-4/5 flex flex-row flex-wrap md:justify-center items-center">
        {options.map((opt) => {
          const url = opt.album.images[0]?.url;
          const artist = opt.artists[0]?.name;
          return (
            <Button
              handleAdd={handleAdd}
              id={opt.id}
              name={opt.name}
              key={opt.id}
              url={url}
              artist={artist}
              initial={true}
              {...opt}
            />
          );
        })}
        <br />
        <div className="space-x-2 flex flex-row w-full justify-center pb-16">
          <Link href={"/playlists"}>
            <a className="py-2 px-5 text-xs  text-red-600 my-4">Cancel</a>
          </Link>
          <button
            onClick={handleContinue}
            className="py-2 px-5 text-xs  bg-primary my-4"
          >
            Create playlist
          </button>
        </div>
      </div>
    </>
  );
};
export default SelectRecommendedTracks;
