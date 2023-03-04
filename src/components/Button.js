import Image from "next/image";
import { useState } from "react";

const Button = ({ id, name, url, handleAdd, initial = false }) => {
  const [clicked, setClicked] = useState(initial);
  return (
    <button
      key={id}
      onClick={() => {
        handleAdd(id);
        setClicked(!clicked);
      }}
      className={`py-2  my-1 rounded-3xl px-4 text-xs border ${
        clicked && "bg-[#FF5665]"
      } border-[#564a4b] flex flex-row items-center justify-between`}
    >
      {/* <Image
        src={url}
        width={25}
        height={25}
        alt="Image"
        className="rounded-xl"
      /> */}
      <span>{name}</span>
      {/* <span className="block text-xs font-light">A-Reece</span> */}
    </button>
  );
};

export default Button;
