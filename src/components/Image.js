import Image from "next/image";
import { useState } from "react";

const DynamicImage = ({ imgUrl, height = "350", width = "350", ...rest }) => {
  const [loading, setLoading] = useState(true);

  return (
    <Image
      src={imgUrl}
      width={width}
      height={height}
      className={`fixed top-0 left-0 object-cover object-top shadow-2xl shadow-red-900 duration-700 ease-in-out ${
        loading ? "grayscale blur-2xl scale-110" : ""
      }`}
      alt="Main cover"
      loading="lazy"
      onLoadingComplete={() => setLoading(false)}
      {...rest}
    />
  );
};

export default DynamicImage;
