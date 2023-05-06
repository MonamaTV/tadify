import axios from "axios";
import { useEffect, useRef, useState } from "react";
import PlaylistItem from "./PlaylistItem";

const UpdatePlaylist = ({ playlistId, closeUpdate }) => {
  const ref = useRef();

  const [tracks, setTracks] = useState([]);
  const [uris, setUris] = useState(null);
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

  const [oldPosition, setPosition] = useState(0);

  const handleDrop = async (node, newPosition) => {
    if (newPosition === undefined || newPosition === null) return;
    if (oldPosition === undefined || oldPosition === null) return;
    if (oldPosition === newPosition) return;

    node.currentTarget.classList.remove("border-primary", "border-b-2", "pb-2");

    if (oldPosition === newPosition + 1) return;

    const tracksCopy = [...tracks];
    //Copy the track before removing it
    const copy = tracksCopy[oldPosition - 1];
    //Remove the track
    tracksCopy.splice(--oldPosition, 1);
    //Check whether the track is being moved to
    if (oldPosition > newPosition) {
      tracksCopy.splice(newPosition, 0, copy);
    } else {
      tracksCopy.splice(newPosition - 1, 0, copy);
    }
    //Nullify the postions and update the tracks usestate
    newPosition = 0;
    setPosition(0);

    setTracks(tracksCopy);
    setUris(tracksCopy.map((track) => track?.track?.uri).join(","));
  };

  const updateSpotifyPlaylist = async () => {
    ref.current.classList.add("opacity-40");
    ref.current.classList.add("cursor-not-allowed");
    try {
      await axios.put("/api/playlists", {
        uris,
        playlistId,
      });
    } catch (error) {
      console.log(error);
    }
    ref.current.classList.remove("opacity-40");
    ref.current.classList.remove("cursor-not-allowed");
  };

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

  useEffect(() => {
    if (!uris) return;
    updateSpotifyPlaylist();
  }, [uris]);

  useEffect(() => {
    fetchPlaylistTracks();
  }, [playlistId]);

  return (
    playlist && (
      <div className="bg-white dark:bg-background w-[100vw] md:w-[40vw] md:fixed fixed top-0 md:right-0 md:left-auto left-0 shadow border-gray-300 h-[100vh] border-l dark:border-gray-800 px-4 py-5 flex   flex-col pb-20 z-30 text-gray-900 dark:text-white overflow-y-scroll">
        <button
          draggable={false}
          onClick={closeUpdate}
          className="w-20 bg-red-700 text-white text-xs px-3 py-1 my-1"
        >
          Close
        </button>

        <h3 className="font-bold text-xl mt-3 dark:text-white text-gray-900">
          {playlist.name}
        </h3>
        <p className="mb-3" draggable={false}>
          {playlist?.tracks?.items?.length} tracks
        </p>
        <small draggable={false} className="text-xs">
          Drag and drop to sort your playlist
        </small>
        <div ref={ref}>
          {tracks?.map((item, index) => {
            const track = item.track;
            return (
              <PlaylistItem
                handleDragLeave={handleDragLeave}
                handleDrop={handleDrop}
                handleDragOver={handleDragOver}
                setPosition={setPosition}
                track={track}
                key={track.id}
                index={index}
              />
            );
          })}
        </div>
      </div>
    )
  );
};

export default UpdatePlaylist;
