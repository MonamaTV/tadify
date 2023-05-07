import Image from "next/image";
import * as cookie from "cookie";
import { colors } from "../../src/utils/app";
import { axiosClient, getUserAccessData } from "../../src/utils/axios";
import Link from "next/link";
import Meta from "../../src/components/Head";
import { useTheme } from "next-themes";
import Playlist from "../../src/components/Playlist";
import UpdatePlaylist from "../../src/components/UpdatePlaylist";
import { useState } from "react";

const Playlists = ({ playlists, color }) => {
  const { theme, setTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [playlistId, setPlaylistId] = useState("");

  const openUpdatePlaylist = (id) => {
    setIsOpen(true);
    setPlaylistId(id);
  };

  const closeUpdate = () => {
    setIsOpen(false);
    setPlaylistId("");
  };

  return (
    <>
      <Meta />
      <div
        className={`flex  w-full relative bg-gradient-to-b ${color} dark:to-background text-gray-900 dark:text-white md:p-10 flex-col md:flex-row sm:flex-row h-[240px] md:h-[250px]`}
      >
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="absolute right-3 md:right-10 top-8 md:top-auto  rounded-lg text-gray-100 text-xs px-4 py-1 md:flex items-center justify-center "
        >
          {theme === "light" ? (
            <Image src={"/sun.png"} width={20} height={20} alt="user theme" />
          ) : (
            <Image src={"/moon.png"} width={20} height={20} alt="user theme" />
          )}
        </button>
        <div className="flex flex-col md:w-5/6 p-8 py-7 md:p-0">
          <h2 className="md:text-5xl font-bold text-4xl select-none">
            Create new playlists
          </h2>
          <div className="my-3 flex">
            <Link href={"/playlists/create"}>
              <a className="bg-primary border border-primary py-1.5 my-3 w-40 text-xs shadow-2xl text-center shadow-black text-white mx-1 px-2">
                From my fav artists
              </a>
            </Link>
            <button
              disabled={true}
              className="cursor-not-allowed  border border-gray-900 dark:border-gray-100 py-1.5 my-3 w-20 text-xs shadow-2xl text-center shadow-black mx-1 px-2"
            >
              AI playlist
            </button>
          </div>
        </div>
      </div>
      <div className="py-1 px-5 md:px-10 bg-gradient-to-b dark:from-background dark:to-background pb-12 min-h-screen">
        <div>
          {playlists.length > 0 && (
            <table className="my-2 w-full md:w-2/4 border-separate border-spacing-y-3 border-spacing-x-0">
              <thead className="hidden md:table-header-group  w-full text-left px-5 h-14 dark:text-gray-100 text-gray-900">
                <tr>
                  <th></th>
                  <th className="md:w-2/6 md:px-4 px-2"></th>
                  <th>Name</th>
                  <th>Created by</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {playlists.map((play, index) => (
                  <Playlist
                    play={play}
                    key={play?.id}
                    index={index}
                    handleClick={openUpdatePlaylist}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {isOpen && playlistId ? (
        <div
          onClick={() => setIsOpen(false)}
          className="bg-gray-100/80 dark:bg-gray-500/70 w-[100vw] h-[100vh] fixed top-0 left-0 overflow-auto"
        >
          <UpdatePlaylist playlistId={playlistId} closeUpdate={closeUpdate} />
        </div>
      ) : null}
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const { refresh_token } = cookie.parse(context.req.headers.cookie);

    const {
      data: { access_token },
    } = await getUserAccessData(refresh_token);

    const res = await axiosClient().get("/me/playlists", {
      params: {
        limit: 30,
      },
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });

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
        playlists: items ?? [],
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
export default Playlists;
