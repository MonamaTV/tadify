import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Track from "../../src/components/Track";
import * as cookie from "cookie";
import Filter from "../../src/components/Filter";
import useVisibility from "../../src/hooks/useVisibility";
import { axioAPIClient } from "../../src/utils/axios";

const Tracks = (props) => {
  const [tracks, setTracks] = useState(props.tracks ?? []);
  const [loadingImg, setLoadingImg] = useState(true);

  const fetchTopTracks = async (range) => {
    const ranges = ["short_term", "medium_term", "long_term"];
    //
    try {
      const response = await axios.get("/api/tracks", {
        withCredentials: true,
        params: {
          refresh_token: props.refresh_token,
          range: ranges[--range],
        },
      });
      const { data } = response;
      setTracks(data.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const extractTopTrack = () => {
    const track = tracks[0];
    const { artists, name, uri, album } = track;
    const displayArtists = artists.map((art) => art.name).join(", ");
    const cover = album.images[0].url;

    return {
      displayArtists,
      cover,
      name,
      uri,
    };
  };

  const { ref, isComponentVisible, setIsComponentVisible } =
    useVisibility(false);

  return (
    <>
      <div className="flex w-full relative bg-gradient-to-b from-[#1db954] to-[#191414] text-white p-10  flex-col md:flex-row sm:flex-row">
        <Image
          alt="Main cover art"
          src={extractTopTrack().cover}
          width={"300"}
          height={"300"}
          className={`shadow-2xl shadow-black  ${
            loadingImg ? "bg-gray-400" : ""
          }`}
          loading="lazy"
          onLoadingComplete={() => setLoadingImg(false)}
        />
        <div className="flex flex-col justify-center md:pl-10 md:w-5/6 sm:pl-10">
          <p className="my-2 mt-4 sm:my-4 text-sm sm:text-base">No. 1</p>
          <h2 className="md:text-5xl font-bold text-2xl">
            {extractTopTrack().name}
          </h2>
          <h4 className="my-2 sm:my-4 text-sm sm:text-base">
            {extractTopTrack().displayArtists}
          </h4>
        </div>
        <button
          onClick={() => setIsComponentVisible(true)}
          className="absolute right-10 top-2 md:top-auto  rounded-lg text-gray-100 text-xs px-4 py-1 md:flex items-center justify-center "
        >
          <Image src={"/sharew.png"} width={20} height={20} alt="Share" />
        </button>
        {isComponentVisible && (
          <div
            ref={ref}
            className="absolute top-2 right-10 md:flex flex-col items-baseline text-xs bg-[#191414] rounded-lg shadow-xl text-gray-100 px-4 py-4 gap-y-1 w-40"
          >
            <button className=" hover:bg-[#1db954] w-full hover:text-white py-1 rounded-[0.45rem] text-xs">
              Download
            </button>
            <button className=" hover:bg-[#1db954] w-full hover:text-white py-1 rounded-[0.45rem] text-xs">
              Facebook
            </button>
            <button className=" hover:bg-[#1db954] w-full hover:text-white py-1 rounded-[0.45rem] text-xs">
              Twitter
            </button>
          </div>
        )}
        {/* Menu for mobile */}
      </div>
      <div className="py-1 px-5 md:px-10 bg-gradient-to-b from-[#191414] to-[#191414] ">
        {/* Filtering */}
        {/* <div className="flex flex-row mt-10">
          <button
            onClick={() => fetchTopTracks(1)}
            className={`px-3 md:px-5 py-1 ${
              tapButton === 1 ? "bg-[#1db954]" : "bg-gray-300"
            } mx-1 text-white text-xs md:text-sm rounded-md md:rounded-xl`}
          >
            Last 4 weeks
          </button>
          <button
            onClick={() => fetchTopTracks(2)}
            className={`px-3 md:px-5 py-1 ${
              tapButton === 2 ? "bg-[#1db954]" : "bg-gray-300"
            } mx-1 text-white text-xs md:text-sm rounded-md md:rounded-xl`}
          >
            Last 6 months
          </button>
          <button
            onClick={() => fetchTopTracks(3)}
            className={`px-3 md:px-5 py-1 ${
              tapButton === 3 ? "bg-[#1db954]" : "bg-gray-300"
            } mx-1 text-white text-xs md:text-sm rounded-md md:rounded-xl`}
          >
            All time
          </button>
        </div> */}
        <Filter handleFilter={fetchTopTracks} />
        {/* From 2 to 20 */}
        <div>
          <table className="my-2 w-full md:w-3/4 border-separate border-spacing-y-3 border-spacing-x-0">
            <thead className="hidden md:table-header-group  w-full text-left px-5 h-14 text-gray-100 ">
              <tr>
                <th></th>
                <th></th>
                <th className="md:w-2/6 md:px-4 px-2">Track ID</th>
                <th>Artist</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {tracks.slice(1, tracks.length).map((track, index) => (
                <Track track={track} key={track.id} pos={++index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  //   const value = cookie.parse(context.req.headers.cookie[0]);

  console.log(process.env.NODE_ENV);

  try {
    const { refresh_token, access_token } = cookie.parse(
      context.req.headers.cookie
    );

    const res = await axioAPIClient().get("/tracks", {
      withCredentials: true,
      params: {
        refresh_token,
        access_token,
      },
    });

    //If user removed the app, start the auth again
    if (res.status === 400) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }

    const { data } = res;
    const items = data.data.items;

    return {
      props: {
        tracks: items ?? [],
        refresh_token,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
}
export default Tracks;
