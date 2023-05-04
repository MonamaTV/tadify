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
      setTracks(data?.data?.tracks?.items);
    } catch (error) {
      setPlaylist([]);
    }
  };

  useEffect(() => {
    fetchPlaylistTracks();
  }, [playlistId]);

  return (
    playlist && (
      <div className="bg-white dark:bg-background w-[100vw] md:w-[25vw] md:fixed fixed top-0 md:right-0 md:left-auto left-0 shadow border-gray-300 h-[100vh] border-l dark:border-gray-800 px-4 py-5 flex   flex-col pb-44 z-30 text-gray-900 dark:text-white overflow-y-scroll">
        <button
          onClick={closeUpdate}
          className="w-20 bg-red-700 text-white text-xs px-3 py-1 my-1"
        >
          Close
        </button>
        <Image
          src={playlist.images[0]?.url}
          width={"350"}
          height={"350"}
          alt="Playlist image"
        />
        <h3 className="font-bold text-xl mt-3 dark:text-white text-gray-900">
          {playlist.name}
        </h3>
        <small className="mb-3">{playlist?.tracks?.items?.length} tracks</small>

        {playlist?.tracks?.items?.map((item, index) => {
          const track = item.track;
          return (
            <div
              key={track.id}
              className="flex flex-row items-center gap-3 my-1 px-1"
            >
              <p className="w-4">{++index}.</p>
              <Image
                src={track.album.images[0].url}
                width={50}
                height={50}
                alt="Cover art"
              />
              <h4 className="flex flex-col w-[100%] text-gray-900 dark:text-gray-100 font-medium ">
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
    )
  );
};

export default UpdatePlaylist;
