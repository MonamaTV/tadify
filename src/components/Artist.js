import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DynamicImage from "./Image";

const Artist = ({ artist, pos }) => {
  const { name, images, genres, uri } = artist;

  const [loading, setLoading] = useState(true);

  const displayGenres = genres
    .slice(0, 3)
    .map((gen) => gen)
    .join(", ");
  const photoUrl = images[0].url;

  return (
    <tr className=" text-gray-900 dark:text-gray-100 font-medium  w-full ">
      <td className="w-1 text-center">{++pos}.</td>
      <td className="flex justify-center items-center h-full md:w-full w-[100px]">
        {/* <Image
          src={photoUrl}
          width={70}
          height={70}
          className={`shadow-xl items-center justify-center duration-700 ease-in-out ${
            loading ? "grayscale blur-2xl scale-110" : ""
          }`}
          onLoadingComplete={() => setLoading(false)}
          alt="Artist photo"
        /> */}
        <Link href={uri}>
          <DynamicImage
            imgUrl={photoUrl}
            width={"70"}
            height={"70"}
            alt="Artist photo"
          />{" "}
        </Link>
      </td>
      <td className="">
        <span className="text-sm md:text-[1.1em]">
          <Link href={uri}>{name}</Link>
        </span>
        <small className="block text-xs">{displayGenres}</small>
      </td>
    </tr>
  );
};

export default Artist;
