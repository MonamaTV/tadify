import Image from "next/image";

const Artist = ({ artist, pos }) => {
  const { name, images, genres } = artist;

  const displayGenres = genres
    .slice(0, 3)
    .map((gen) => gen)
    .join(", ");
  const photoUrl = images[0].url;

  return (
    <tr className=" text-gray-500 font-medium hover:bg-gray-100 hover:rounded-lg w-full ">
      <td className="w-1 text-center">{++pos}</td>
      <td className="flex justify-center items-center h-full md:w-full w-[100px]">
        <Image
          src={photoUrl}
          width={70}
          height={70}
          className="shadow-xl items-center justify-center"
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
