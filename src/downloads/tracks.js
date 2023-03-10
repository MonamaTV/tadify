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
      className="flex w-full md:w-[500px]  bg-gradient-to-b from-[#1db954] to-[#191414] text-white p-10 flex-col h-[750px] justify-center relative min-h-[700px]"
    >
      <h2 className="font-bold text-2xl">My Spotify Top Tracks</h2>
      <p className="text-sm">{timeRange}</p>
      <div className="my-4">
        {data.map(({ album, name, artists, id }, index) => {
          let names = artists.map((art) => art.name).join(", ");
          let cover = album.images[0].url;
          return (
            <div className="flex items-center my-3" key={id}>
              <p className="w-5 pb-4">{++index}</p>
              <Image
                src={cover}
                width={50}
                height={50}
                alt={name}
                objectFit="cover"
                className="shadow-2xl shadow-black"
              />
              <h4 className="pl-3 text-sm font-medium w-64 pb-4">
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
