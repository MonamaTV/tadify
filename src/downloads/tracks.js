const DownloadableTracksList = ({ data, range = 0, ...props }) => {
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
      <h2 className="font-bold text-2xl">My Spotify Top Tracks</h2>
      <p className="text-sm">{timeRange}</p>
      <div className="my-4">
        {data.map(({ name, artists, id }, index) => {
          let names = artists.map((art) => art.name).join(", ");
          return (
            <div className="flex items-center my-3" key={id}>
              <p className="w-5 pb-4">{++index}</p>
              <h4 className="pl-3 text-3xl font-bold w-64 pb-4">
                {name}
                <span className="block text-xs font-normal">{names}</span>
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

export default DownloadableTracksList;
