"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const UpdatePlaylist = ({ playlistId, closeUpdate }) => {
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState(null);
  const fetchPlaylistTracks = async () => {
    try {
      const { data } = await axios.get(`/api/playlist/${playlistId}`);
      setPlaylist(data?.data);
      setTracks(data?.data.tracks.items);
    } catch (error) {
      setPlaylist([]);
    }
  };

  const handleDragEnd = (node, trackId, newPosition) => {
    if (newPosition === undefined || newPosition === null) return;
    if (oldPosition === newPosition) return;

    if (oldPosition === newPosition + 1) return;

    const tracksCopy = [...tracks];

    const copy = tracksCopy[oldPosition - 1];
    tracksCopy.splice(--oldPosition, 1);
    tracksCopy.splice(--newPosition, 0, copy);
    newPosition = oldPosition = 0;
    node.currentTarget.classList.remove("border-primary", "border-b-2", "pb-2");

    setTracks(tracksCopy);
  };

  console.log(tracks);

  const handleDragOver = (node) => {
    node.preventDefault();
    node.currentTarget.classList.add(
      "border-primary",
      "border-b-2",
      "pb-2",
      "z-30"
    );
  };

  const handleDragLeave = (node) => {
    node.currentTarget.classList.remove("border-primary", "border-b-2", "pb-2");
  };

  let oldPosition = null;

  useEffect(() => {
    fetchPlaylistTracks();
  }, [playlistId]);

  return (
    playlist && (
      <div className="bg-white dark:bg-background w-[100vw] md:w-[30vw] md:fixed fixed top-0 md:right-0 md:left-auto left-0 shadow border-gray-300 h-[100vh] border-l dark:border-gray-800 px-4 py-5 flex   flex-col pb-20 z-30 text-gray-900 dark:text-white overflow-y-scroll">
        <button
          onClick={closeUpdate}
          className="w-20 bg-red-700 text-white text-xs px-3 py-1 my-1"
        >
          Close
        </button>

        <h3 className="font-bold text-xl mt-3 dark:text-white text-gray-900">
          {playlist.name}
        </h3>
        <p className="mb-3">{playlist?.tracks?.items?.length} tracks</p>
        <small className=" text-xs">Drag and drop to sort your playlist</small>
        <div>
          {tracks?.map((item, index) => {
            const track = item.track;
            return (
              <div
                key={track.id + new Date()}
                id={track.id}
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
                  oldPosition = index;
                }}
                onDrop={(e) => handleDragEnd(e, track.id, index)}
                className="flex flex-row items-center gap-3 my-2 px-1 transition-all duration-400"
              >
                <p className="w-4">{++index}.</p>
                <Image
                  src={track.album.images[0].url}
                  width={50}
                  height={50}
                  alt="Cover art"
                  draggable={false}
                />
                <h4
                  draggable={false}
                  className="flex flex-col w-[100%] text-gray-900 dark:text-gray-100 font-medium "
                >
                  <span className="text-xs md:text-sm ">
                    {track.name.slice(0, 20) + "..."}
                  </span>
                  <span className="text-xs">
                    {track.artists
                      .map((artist) => artist.name)
                      .join(", ")
                      .slice(0, 50)}
                  </span>
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default UpdatePlaylist;
