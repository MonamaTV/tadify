import Image from "next/image";
import { useState } from "react";

const Button = ({ id, name, url, handleAdd, artist, initial = false }) => {
  const [clicked, setClicked] = useState(initial);
  const [loading, setLoading] = useState(true);
  return (
    <button
      key={id}
      onClick={() => {
        handleAdd(id);
        setClicked(!clicked);
      }}
      className={` my-1  text-xs  border ${
        clicked
          ? "bg-secondary border-secondary text-white"
          : "border border-[#564a4b]"
      }  flex flex-row items-center justify-between space-x-1`}
    >
      <Image
        src={url}
        width={40}
        height={40}
        alt="Image"
        loading="lazy"
        onLoadingComplete={() => setLoading(false)}
        className={` shadow-2xl shadow-white duration-700 ease-in-out ${
          loading ? "grayscale blur-2xl scale-110" : ""
        }`}
      />
      <div className="px-3 m-0">
        <span className="text-xs">{name}</span>
        {artist && <small className="block text-xs font-light">{artist}</small>}
      </div>
    </button>
  );
};

export default Button;
