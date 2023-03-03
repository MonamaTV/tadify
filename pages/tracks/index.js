import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Track from "../../src/components/Track";
import * as cookie from "cookie";
import Filter from "../../src/components/Filter";
import useVisibility from "../../src/hooks/useVisibility";
import { axioAPIClient } from "../../src/utils/axios";

import Modal from "../../src/components/Modal";
import DownloadableTracksList from "../../src/downloads/tracks";
import Meta from "../../src/components/Head";
import DynamicImage from "../../src/components/Image";
import html2canvas from "html2canvas";
import { colors } from "../../src/utils/app";

const Tracks = (props) => {
  console.log(props.color);
  const download = (e) => {
    e.target.disabled = true;
    html2canvas(document.getElementById("tracks"), {
      imageTimeout: 3000,
    }).then(function (canvas) {
      const url = canvas.toDataURL();
      const link = document.createElement("a");
      link.download = "tadify-top-tracks.jpeg";
      link.href = url;
      link.click();
    });
    setView(false);
  };

  const [view, setView] = useState(false);
  const [tracks, setTracks] = useState(props.tracks ?? []);

  const [timeRange, setTimeRange] = useState(1);

  const fetchTopTracks = async (range) => {
    setTimeRange(range);
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

  if (tracks.length < 1 || !tracks) {
    return (
      <>
        <Meta />
        <div className="flex w-full justify-center items-center h-screen  relative bg-gradient-to-b from-[#1db954] to-[#191414] text-white p-10  flex-col ">
          <h3 className="font-bold text-2xl">
            It seems like you do not have any data{" "}
            {
              ["for the last 4 weeks", "for the last 6 months", "Of all time"][
                --timeRange
              ]
            }
          </h3>
          <Filter handleFilter={fetchTopTracks} />
        </div>
      </>
    );
  }

  return (
    <>
      <Meta />
      <div
        className={`flex w-full relative bg-gradient-to-b ${props.color} to-[#191414] text-white md:p-10 flex-col md:flex-row sm:flex-row`}
      >
        <DynamicImage imgUrl={extractTopTrack()?.cover} />
        <div className="flex flex-col justify-center px-8 md:pl-10 md:w-5/6 sm:pl-10 ">
          <p className="my-2 mt-4 sm:my-4 text-sm sm:text-base">No. 1</p>
          <h2 className="md:text-5xl font-bold text-2xl select-none">
            {extractTopTrack().name}
          </h2>
          <h4 className="my-2 sm:my-4 text-sm sm:text-base ">
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
            <button
              onClick={() => setView(true)}
              className=" hover:bg-[#1db954] w-full hover:text-white py-1 rounded-[0.45rem] text-xs"
            >
              View
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
      <div className="py-1 px-5 md:px-10 bg-gradient-to-b from-[#191414] to-[#191414] pb-12">
        <Filter handleFilter={fetchTopTracks} />
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

      {view && (
        <Modal closeModal={() => setView(!view)} downloadStats={download}>
          <DownloadableTracksList
            data={tracks.slice(0, 5)}
            id={"tracks"}
            range={timeRange}
          />
        </Modal>
      )}
    </>
  );
};
export async function getServerSideProps(context) {
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
    //generate a number between 0 and 5

    return {
      props: {
        color: colors[Math.floor(Math.random() * colors.length)],
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
