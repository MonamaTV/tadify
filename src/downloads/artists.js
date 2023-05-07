const DownloadableArtistsList = ({ data, range = 0, ...props }) => {
  const timeRange = [
    "For the last 4 weeks",
    "For the last 6 months",
    "Of all time",
  ][--range];
  return (
    <div
      {...props}
      className="flex w-full md:w-[500px]  bg-gradient-to-b from-background to-background text-white p-10 flex-col h-[750px] justify-center relative min-h-[700px] "
    >
      <h2 className="font-bold text-2xl">My Spotify Top Artists</h2>
      <p className="text-sm">{timeRange}</p>
      <div className="my-4">
        {data.slice(0, 10).map((artist, index) => {
          const { name, genres, id } = artist;

          const displayGenres = genres
            .slice(0, 3)
            .map((gen) => gen)
            .join(", ");
          return (
            <div className="flex items-center gap-2 my-2" key={id}>
              <p className="w-5 pb-4">{++index}</p>

              <h4 className="pl-3 text-3xl font-bold w-64 pb-4">
                {name}
                <span className="block text-xs font-light">
                  {displayGenres}
                </span>
              </h4>
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-5 sm:bottom-10 left-8">
        <img src={"/spotify.png"} width={80} height={25} />
      </div>
    </div>
  );
};

export default DownloadableArtistsList;
