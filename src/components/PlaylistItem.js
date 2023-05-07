import Image from "next/image";
import React from "react";
import DynamicImage from "./Image";

const PlaylistItem = ({
  track,
  handleDrop,
  handleDragLeave,
  handleDragOver,
  setPosition,
  index,
}) => {
  return (
    <div
      key={track.id}
      draggable
      onDragOver={handleDragOver}
      onDragEnd={(e) => {
        e.currentTarget.classList.remove(
          "border-primary",
          "border-b-2",
          "pb-2",
          "opacity-50"
        );
      }}
      onDragLeave={handleDragLeave}
      onDragStart={(e) => {
        e.currentTarget.classList.add("opacity-50");
        setPosition(index);
      }}
      onDrop={(e) => handleDrop(e, index)}
      className="flex flex-row items-center gap-3 my-2 px-1 transition-all duration-400"
    >
      <p className="w-4">{++index}.</p>
      <DynamicImage
        imgUrl={track.album.images[0].url}
        alt="Cover art"
        draggable={false}
        width={"50"}
        height={"50"}
      />
      <h4
        draggable={false}
        className="flex flex-col w-[100%] text-gray-900 dark:text-gray-100 font-medium "
      >
        <span className="text-xs md:text-sm ">
          {track.name.slice(0, 40) + "..."}
        </span>
        <span className="text-xs dark:text-gray-300 text-gray-700">
          {track.artists
            .map((artist) => artist.name)
            .join(", ")
            .slice(0, 50)}
        </span>
      </h4>
    </div>
  );
};

export default PlaylistItem;
