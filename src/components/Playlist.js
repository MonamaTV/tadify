import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Playlist = ({ play, index }) => {
  const [loading, setLoading] = useState(true);
  return (
    <tr
      className=" dark:text-gray-100 text-gray-900 font-medium  w-full"
      key={play?.id}
    >
      <td className="w-10 text-center">{++index}</td>
      <td className="flex justify-center items-center h-full">
        <Link href={play?.uri}>
          <Image
            src={play?.images[0].url}
            width={60}
            height={60}
            className={`shadow-xl cursor-pointer items-center justify-center duration-700 ease-in-out ${
              loading ? "grayscale blur-2xl scale-110" : ""
            }`}
            alt="playlist art"
            onLoadingComplete={() => setLoading(false)}
          />
        </Link>
      </td>
      <td className="text-xs md:text-sm md:w-2/6 md:px-0 px-2">
        <span className="block">
          <Link href={play?.uri}>{play?.name}</Link>
        </span>
        <small className="md:hidden text-center">
          Created by {play?.owner?.display_name}
        </small>
      </td>
      <td className="hidden md:table-cell md:text-sm">
        {play?.owner?.display_name}
      </td>
    </tr>
  );
};

export default Playlist;
