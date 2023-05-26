import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useVisibility from "../hooks/useVisibility";
import axios from "axios";
import { useEffect, useState } from "react";
import * as cookie from "cookie";

const Nav = () => {
  const router = useRouter();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useVisibility(false);
  const { theme } = useTheme();

  const [user, setUser] = useState(null);

  const [score, setScore] = useState(0);

  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/users");
      setUser(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserTopArtists = async () => {
    try {
      const { data } = await axios.get("/api/artists", {
        params: {
          range: "long_term",
        },
      });
      const totalPopularity = data?.data?.items.reduce((sum, artist) => {
        return sum + artist.popularity;
      }, 0);

      setScore(
        Math.floor((totalPopularity / (data.data.items.length * 100)) * 100)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getUserTopArtists();
  }, []);

  return (
    <>
      <div className="hidden md:block h-screen w-1/6 fixed dark:bg-background px-10 pt-2 transition-colors ease-in-out duration-400">
        {theme === "light" ? (
          <Image src={"/logodark.svg"} width={80} height={90} alt="Logo" />
        ) : (
          <Image src={"/logolight.svg"} width={80} height={90} alt="Logo" />
        )}
        <ul className="my-4 list-none text-gray-900 dark:text-white text-sm space-y-5">
          <li>
            <Link href={"/tracks"}>
              <a className="flex items-center gap-3">
                <Image
                  src={
                    router.pathname === "/tracks"
                      ? "/rartists.png"
                      : "/artists.png"
                  }
                  width={20}
                  height={20}
                  alt="Tracks"
                />
                Fav tracks
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/artists"}>
              <a className="flex items-center gap-3">
                <Image
                  src={
                    router.pathname === "/artists"
                      ? "/rfavorite.png"
                      : "/favorite.png"
                  }
                  width={20}
                  height={20}
                  alt="Artists"
                />
                Fav artists
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/playlists"}>
              <a className="flex items-center gap-3">
                <Image
                  src={
                    router.pathname === "/playlists" ? "/radd.png" : "/add.png"
                  }
                  width={20}
                  height={20}
                  alt="Artists"
                />
                Playlists
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/plays"}>
              <a className="flex items-center gap-3">
                <Image
                  src={
                    router.pathname === "/plays" ? "/rplay.png" : "/play.png"
                  }
                  width={20}
                  height={20}
                  alt="Plays"
                />
                Recent plays
              </a>
            </Link>
          </li>
        </ul>
        <div>
          {isComponentVisible && (
            <div className="absolute bottom-14 md:flex flex-col items-baseline  text-xs dark:bg-background bg-white  border dark:border-background-light select-none dark:text-gray-100 text-gray-900 px-4 py-4 gap-y-1 w-40">
              <button className="text-left px-2 hover:bg-primary w-full hover:text-white py-1  text-xs">
                Tadify profile
              </button>
              <button className="text-left px-2 hover:bg-primary w-full hover:text-white py-1  text-xs">
                Open Spotify
              </button>

              <button className="text-left px-2 hover:bg-primary w-full hover:text-white py-1  text-xs">
                Logout
              </button>
            </div>
          )}
          <div
            ref={ref}
            onClick={() => setIsComponentVisible(!isComponentVisible)}
            className=" absolute bottom-3 w-42 text-center py-2 flex flex-row items-center justify-center active:bg-primary px-3 dark:text-white text-gray-900 cursor-pointer dark:active:text-white active:text-white select-none"
          >
            {user ? (
              <>
                {user.images.length > 0 && (
                  <Image
                    width={35}
                    height={35}
                    src={user.images[0].url}
                    className="rounded-full"
                    alt="Profile picture"
                  />
                )}
                <div className="flex flex-col mx-4 justify-start items-start">
                  <p className="text-sm ">{user.display_name}</p>
                  <small className="text-[10px] font-normal ">
                    {score} basic score
                  </small>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className="md:hidden fixed bottom-0 bg-white bg-gradient-to-b dark:from-background dark:to-[#191414fa] w-screen z-20 h-14 opacity-95 transition-colors ease-in-out duration-400">
        <ul className="py-2 list-none flex flex-row text-gray-900 dark:text-white text-xs w-full justify-evenly items-start">
          <li>
            <Link href={"/tracks"}>
              <a className="flex items-center gap-2 flex-col text-xs w-20">
                <Image
                  src={
                    router.pathname === "/tracks"
                      ? "/rartists.png"
                      : "/artists.png"
                  }
                  width={20}
                  height={20}
                  alt="Tracks"
                />
                Fav tracks
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/artists"}>
              <a className="flex items-center gap-2 flex-col text-xs w-20">
                <Image
                  src={
                    router.pathname === "/artists"
                      ? "/rfavorite.png"
                      : "/favorite.png"
                  }
                  width={20}
                  alt="Artists"
                  height={20}
                />
                Fav artists
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/playlists"}>
              <a className="flex items-center gap-2 flex-col text-xs w-20">
                <Image
                  src={
                    router.pathname === "/playlists" ? "/radd.png" : "/add.png"
                  }
                  width={20}
                  alt="Artists"
                  height={20}
                />
                Playlists
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/plays"}>
              <a className="flex items-center gap-2 flex-col text-xs w-20">
                <Image
                  src={
                    router.pathname === "/plays" ? "/rplay.png" : "/play.png"
                  }
                  width={20}
                  height={20}
                  alt="Plays"
                />
                Recent plays
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Nav;
