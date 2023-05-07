import Image from "next/image";

const DownloadableTracksList = ({ data, range = 0, ...props }) => {
  const timeRange = [
    "For the last 4 weeks",
    "For the last 6 months",
    "Of all time",
  ][--range];
  return (
    <div
      {...props}
      className="flex w-full md:w-[500px]  bg-gradient-to-b from-background to-background text-white p-10 flex-col justify-start relative "
    >
      <h2 className="font-bold text-xl">My Spotify Top Tracks</h2>
      <p className="text-sm">{timeRange}</p>
      <div className="my-4">
        {data.map(({ name, artists, id }, index) => {
          let names = artists.map((art) => art.name).join(", ");
          return (
            <div className="flex items-center my-1" key={id}>
              <p className="w-5 pb-4">{++index}.</p>
              <h4 className="pl-3 text-xl font-bold w-64 pb-4">
                {name}
                <span className="block text-xs font-normal">{names}</span>
              </h4>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row">
        <Image src={"/spotify.png"} width={80} height={22} />
      </div>
    </div>
  );
};

export default DownloadableTracksList;
