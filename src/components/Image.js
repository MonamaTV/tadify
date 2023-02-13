import Image from "next/image";
import { useState } from "react";

const DynamicImage = ({ imgUrl }) => {
  const [loading, setLoading] = useState(true);

  return (
    <Image
      src={imgUrl}
      width={"300"}
      height={"300"}
      className={`shadow-2xl shadow-black duration-700 ease-in-out ${
        loading ? "grayscale blur-2xl scale-110" : ""
      }`}
      alt="Main cover"
      loading="lazy"
      onLoadingComplete={() => setLoading(false)}
    />
  );
};

export default DynamicImage;
