import Image from "next/image";
import { useState } from "react";

const Track = ({ track, pos }) => {
  const { artists, name, uri, album } = track;
  const displayArtists = artists.map((art) => art.name).join(", ");
  const cover = album.images[0].url;
  const [loadingImg, setLoadingImg] = useState(true);

  return (
    <tr className=" text-gray-100 font-medium  w-full">
      <td className="w-10 text-center">{++pos}</td>
      <td className="flex justify-center items-center h-full">
        <Image
          src={cover}
          width={70}
          height={70}
          className={`shadow-xl items-center justify-center ${
            loadingImg && "bg-slate-600"
          }`}
          alt="Cover art"
          onLoadingComplete={() => setLoadingImg(false)}
        />
      </td>
      <td className="text-xs md:text-sm md:w-2/6 md:px-4 px-2">
        <span className="block">{name}</span>
        <small className="md:hidden text-center">{displayArtists}</small>
      </td>
      <td className="hidden md:table-cell md:text-sm">{displayArtists}</td>
    </tr>
  );
};

export default Track;
