import axios from "axios";
import Image from "next/image";
import * as cookie from "cookie";
import { useState } from "react";
import Artist from "../../src/components/Artist";
import Filter from "../../src/components/Filter";
import useVisibility from "../../src/hooks/useVisibility";
import { axiosClient, getUserAccessData } from "../../src/utils/axios";
import Modal from "../../src/components/Modal";
import DownloadableArtistsList from "../../src/downloads/artists";
import Meta from "../../src/components/Head";
import DynamicImage from "../../src/components/Image";
import html2canvas from "html2canvas";
import { colors } from "../../src/utils/app";
import Link from "next/link";
import { useTheme } from "next-themes";
import ArtistsLoading from "../../src/components/ArtistsLoading";

const Artists = (props) => {
  const { theme, setTheme } = useTheme();
  const [artists, setArtists] = useState(props.artists ?? []);

  const [loading, setLoading] = useState(false);

  const [view, setView] = useState(false);
  const [timeRange, setTimeRange] = useState(1);

  const downloadFavoriteArtists = (e) => {
    e.target.disabled = true;
    html2canvas(document.getElementById("artists"), {
      imageTimeout: 3000,
      scale: 2,
    }).then(function (canvas) {
      const url = canvas.toDataURL();
      const link = document.createElement("a");
      link.download = "tadify-top-artists.png";
      link.href = url;
      link.click();
    });
    setView(false);
  };

  const fetchTopArtists = async (range) => {
    setTimeRange(range);
    setLoading(true);
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
      setArtists([]);
    }
    setLoading(false);
  };

  const favArtist = () => {
    const { name, images, genres, uri } = artists[0];

    return {
      name,
      uri,
      photoUrl: images[0].url,
      genres: genres
        .slice(0, 3)
        .map((genr) => genr)
        .join(", "),
    };
  };

  const { ref, isComponentVisible, setIsComponentVisible } =
    useVisibility(false);

  if (loading) {
    return <ArtistsLoading />;
  }

  if (artists.length < 1 || !artists) {
    return (
      <>
        <Meta />
        <div className="flex w-full justify-center items-center h-screen  relative dark:bg-gradient-to-b from-background to-background text-white p-10  flex-col bg-white">
          <h3 className="text-2xl text-gray-900 dark:text-gray-100 text-center">
            It seems like you do not have any data{" "}
            {
              ["for the last 4 weeks", "for the last 6 months", "of all time"][
                timeRange - 1
              ]
            }
          </h3>
          <div className="py-1 px-5 md:px-10 pb-12  dark:bg-gradient-to-b dark:from-background dark:to-background to-background text-black">
            <Filter handleFilter={fetchTopArtists} filterValue={0} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Meta />
      <div
        className={`flex w-full bg-gradient-to-b ${props.color} dark:to-background text-gray-900 dark:text-white   md:p-10 md:pt-12 flex-col sm:flex-row relative transition-colors ease-in-out duration-200`}
      >
        <DynamicImage imgUrl={favArtist()?.photoUrl} />
        <div className="flex flex-col justify-center px-5 md:pl-10 md:w-5/6 sm:pl-10 ">
          <p className="my-2 mt-4 sm:my-4 text-sm sm:text-base">No. 1</p>
          <h2 className="md:text-5xl font-bold text-2xl select-none">
            <Link href={favArtist()?.uri}>{favArtist()?.name}</Link>
          </h2>
          <h4 className="my-2 sm:my-4 text-sm sm:text-base">
            {favArtist()?.genres}
          </h4>
        </div>
        <button
          onClick={() => setIsComponentVisible(true)}
          className="absolute right-3 md:right-10 top-8 md:top-auto rounded-lg text-gray-100 text-xs px-4 py-1 md:flex items-center justify-center"
        >
          <Image src={"/sharew.png"} width={20} height={20} alt="Share" />
        </button>
        {isComponentVisible && (
          <div
            ref={ref}
            className="absolute top-2 right-10 md:flex flex-col items-baseline text-xs dark:bg-background bg-white  shadow-xl dark:text-gray-100 text-gray-900 px-4 py-4 gap-y-1 w-40"
          >
            <button
              onClick={() => setView(true)}
              className=" hover:bg-primary w-full hover:text-white py-1  text-xs"
            >
              View
            </button>
            <button
              onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
                setIsComponentVisible(false);
              }}
              className="hover:bg-primary w-full hover:text-white py-1  text-xs"
            >
              Toggle mode
            </button>
            <button className="hover:bg-primary w-full hover:text-white py-1  text-xs">
              Twitter
            </button>
          </div>
        )}
      </div>
      <div className="py-1 px-5 md:px-10 pb-12  bg-gradient-to-b dark:from-background dark:to-background to-background ">
        {/* Filtering */}
        <Filter handleFilter={fetchTopArtists} filterValue={timeRange} />
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
        <Modal
          closeModal={() => setView(!view)}
          downloadStats={downloadFavoriteArtists}
        >
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
  try {
    const { refresh_token } = cookie.parse(context.req.headers.cookie);

    const {
      data: { access_token },
    } = await getUserAccessData(refresh_token);

    const res = await axiosClient().get("/me/top/artists", {
      params: {
        limit: 40,
        time_range: "short_term",
      },
      headers: {
        Authorization: "Bearer " + access_token,
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
    const items = data.items;

    return {
      props: {
        color: colors[Math.floor(Math.random() * colors.length)],
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
