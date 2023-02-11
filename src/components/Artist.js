import Image from "next/image";
import { useState } from "react";

const Artist = ({ artist, pos }) => {
  const { name, images, genres } = artist;

  const [loading, setLoading] = useState(true);

  const displayGenres = genres
    .slice(0, 3)
    .map((gen) => gen)
    .join(", ");
  const photoUrl = images[0].url;

  return (
    <tr className=" text-gray-100 font-medium  w-full ">
      <td className="w-1 text-center">{++pos}</td>
      <td className="flex justify-center items-center h-full md:w-full w-[100px]">
        <Image
          src={photoUrl}
          width={70}
          height={70}
          className={`shadow-xl items-center justify-center ${
            loading && "bg-gray-700"
          }`}
          onLoadingComplete={() => setLoading(false)}
          alt="Artist photo"
        />
      </td>
      <td className="">
        <span className="text-sm md:text-[1.1em]">{name}</span>
        <small className="block text-xs">{displayGenres}</small>
      </td>
    </tr>
  );
};

export default Artist;
