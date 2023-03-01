import axios from "axios";
import Image from "next/image";
import * as cookie from "cookie";
import { useState } from "react";
import Artist from "../../src/components/Artist";
import Filter from "../../src/components/Filter";
import useVisibility from "../../src/hooks/useVisibility";
import { axioAPIClient } from "../../src/utils/axios";
import Modal from "../../src/components/Modal";
import DownloadableArtistsList from "../../src/downloads/artists";

import Meta from "../../src/components/Head";
import DynamicImage from "../../src/components/Image";
import html2canvas from "html2canvas";

const Artists = (props) => {
  const [artists, setArtists] = useState(props.artists ?? []);

  const [view, setView] = useState(false);
  const [timeRange, setTimeRange] = useState(1);

  const download = (e) => {
    e.target.disabled = true;

    html2canvas(document.getElementById("artists"), {
      imageTimeout: 3000,
      scale: 2,
    }).then(function (canvas) {
      const url = canvas.toDataURL();
      const link = document.createElement("a");
      link.download = "tadify-top-artists.jpeg";
      link.href = url;
      link.click();
    });
    setView(false);
  };

  const fetchTopArtists = async (range) => {
    setTimeRange(range);
    const ranges = ["short_term", "medium_term", "long_term"];
    try {
      const response = await axios.get("/api/artists", {
        withCredentials: true,
        params: {
          refresh_token: props.refresh_token,
          range: ranges[--range],
        },
      });
      const { data } = response;
      setArtists(data.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const favArtist = () => {
    const { name, images, genres } = artists[0];

    return {
      name,
      photoUrl: images[0].url,
      genres: genres
        .slice(0, 3)
        .map((genr) => genr)
        .join(", "),
    };
  };

  const { ref, isComponentVisible, setIsComponentVisible } =
    useVisibility(false);

  if (artists.length < 1 || !artists) {
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
          <Filter handleFilter={fetchTopArtists} />
        </div>
      </>
    );
  }

  return (
    <>
      <Meta />
      <div className="flex w-full bg-gradient-to-b from-[#1db954] to-[#191414] text-white p-10 pt-12 flex-col sm:flex-row">
        <DynamicImage imgUrl={favArtist()?.photoUrl} />
        <div className="flex flex-col justify-center md:pl-10 md:w-5/6 sm:pl-10 ">
          <p className="my-2 mt-4 sm:my-4 text-sm sm:text-base">No. 1</p>
          <h2 className="md:text-5xl font-bold text-2xl select-none">
            {favArtist().name}
          </h2>
          <h4 className="my-2 sm:my-4 text-sm sm:text-base">
            {favArtist().genres}
          </h4>
        </div>
        <button
          onClick={() => setIsComponentVisible(true)}
          className="absolute right-10 top-2 md:top-auto rounded-lg text-gray-100 text-xs px-4 py-1 md:flex items-center justify-center"
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
      </div>
      <div className="py-1 px-5 md:px-10 pb-12  bg-gradient-to-b from-[#191414] to-[#191414] ">
        {/* Filtering */}
        <Filter handleFilter={fetchTopArtists} />
        {/* From 2 to 20 */}
        <div>
          <table className="my-2 mt-8 w-full md:w-3/4 border-separate border-spacing-y-2">
            <tbody className="w-full">
              {artists.slice(1, artists.length).map((artist, index) => (
                <Artist artist={artist} pos={++index} key={artist.id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {view && (
        <Modal closeModal={() => setView(!view)} downloadStats={download}>
          <DownloadableArtistsList
            data={artists.slice(0, 5)}
            id={"artists"}
            range={timeRange}
          />
        </Modal>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  //   const value = cookie.parse(context.req.headers.cookie[0]);

  try {
    const { refresh_token, access_token } = cookie.parse(
      context.req.headers.cookie
    );

    const res = await axioAPIClient().get("/artists", {
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
        artists: items ?? [],
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

export default Artists;
