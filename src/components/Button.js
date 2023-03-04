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
        clicked && "bg-[#1db954]"
      } border-[#1db954] flex flex-row items-center justify-between`}
    >
      {/* <Image
        src={url}
        width={25}
        height={25}
        alt="Image"
        className="rounded-xl"
      /> */}
      {name}
    </button>
  );
};

export default Button;
