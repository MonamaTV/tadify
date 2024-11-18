import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DynamicImage from "./Image";

const Track = ({ track, pos }) => {
  const { artists, name, uri, album } = track;
  const displayArtists = artists.map((art) => art.name).join(", ");
  const cover = album.images[0].url;
  const [loadingImg, setLoadingImg] = useState(true);

  return (
    <tr className=" text-gray-900 dark:text-gray-100 font-medium  w-full">
      <td className="w-10 text-center">{++pos}.</td>
      <td className="flex justify-center items-center h-full">
        <Link href={uri}>
          <DynamicImage
            imgUrl={cover}
            width={"70"}
            height={"70"}
            alt="Cover art"
          />
        </Link>
      </td>
      <td className="text-xs md:text-sm md:w-2/6 md:px-4 px-2">
        <span className="block">
          <Link href={uri}>{name}</Link>
        </span>
        <small className="md:hidden text-center">{displayArtists}</small>
      </td>
      <td className="hidden md:table-cell md:text-sm dark:text-gray-300 text-gray-700">
        <Link href={uri}>{displayArtists}</Link>
      </td>
    </tr>
  );
};

export default Track;
