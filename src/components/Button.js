import Image from "next/image";
import { useState } from "react";

const Button = ({ id, name, url, handleAdd, artist, initial = false }) => {
  const [clicked, setClicked] = useState(initial);
  return (
    <button
      key={id}
      onClick={() => {
        handleAdd(id);
        setClicked(!clicked);
      }}
      className={`py-2 my-1 rounded-3xl px-4 text-xs border ${
        clicked && "bg-[#FF5665]"
      } border-[#564a4b] flex flex-row items-center justify-between space-x-1`}
    >
      <Image
        src={url}
        width={25}
        height={25}
        alt="Image"
        loading="lazy"
        className="rounded-xl"
      />
      <div>
        <span>{name}</span>
        {artist && <p className="block text-xs font-light">By {artist}</p>}
      </div>
    </button>
  );
};

export default Button;
