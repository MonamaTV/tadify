import Image from "next/image";

const DownloadableArtistsList = ({ data, range = 0, ...props }) => {
  const timeRange = [
    "For the last 4 weeks",
    "For the last 6 months",
    "Of all time",
  ][--range];
  return (
    <div
      {...props}
      className="flex w-full md:w-[500px]  bg-gradient-to-b to-[#1db954] from-[#191414] text-white p-10 flex-col h-[750px] justify-center"
    >
      <h2 className="font-bold text-2xl">My Spotify Top Artists</h2>
      <p className="text-sm">{timeRange}</p>
      <div className="my-4">
        {data.slice(0, 10).map((artist, index) => {
          const { name, images, genres, id } = artist;

          const displayGenres = genres
            .slice(0, 3)
            .map((gen) => gen)
            .join(", ");
          const photoUrl = images[0].url;
          return (
            <div className="flex items-center gap-2 my-2" key={id}>
              <p className="w-5">{++index}</p>
              <Image
                src={photoUrl}
                width={60}
                height={60}
                className="shadow-2xl shadow-black"
              />
              <h4 className="pl-3 text-sm font-medium w-64">
                {name}
                <span className="block text-xs font-normal">
                  {displayGenres}
                </span>
              </h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DownloadableArtistsList;
