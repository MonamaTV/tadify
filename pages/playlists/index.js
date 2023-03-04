import Image from "next/image";
import { useState } from "react";
import * as cookie from "cookie";
import { colors } from "../../src/utils/app";
import { axioAPIClient } from "../../src/utils/axios";
import Link from "next/link";

const Playlists = (props) => {
  const [playlists, setPlaylists] = useState(props.playlists ?? []);

  //   const fetchTopTracks = async (range) => {
  //     setTimeRange(range);
  //     const ranges = ["short_term", "medium_term", "long_term"];
  //     //
  //     try {
  //       const response = await axios.get("/api/tracks", {
  //         withCredentials: true,
  //         params: {
  //           refresh_token: props.refresh_token,
  //           range: ranges[--range],
  //         },
  //       });
  //       const { data } = response;
  //       setTracks(data.data.items);
  //     } catch (error) {
  //       setTracks([]);
  //     }
  //   };

  return (
    <>
      <div
        className={`flex  w-full relative bg-gradient-to-b ${props.color} to-[#191414] text-white md:p-10 flex-col md:flex-row sm:flex-row h-[200px] md:h-[250px]`}
      >
        <div className="flex flex-col md:w-5/6 p-8 py-7 md:p-0">
          <h2 className="md:text-5xl font-bold text-4xl select-none">
            Create new playlists
          </h2>
          <Link href={"/playlists/create"}>
            <a className="bg-green-500 rounded-md py-1 my-3 w-60 text-sm shadow-2xl text-center">
              Let's get started
            </a>
          </Link>
        </div>
      </div>
      <div className="py-1 px-5 md:px-10 bg-gradient-to-b from-[#191414] to-[#191414] pb-12 min-h-screen">
        <div>
          <table className="my-2 w-full md:w-2/4 border-separate border-spacing-y-3 border-spacing-x-0">
            <thead className="hidden md:table-header-group  w-full text-left px-5 h-14 text-gray-100 ">
              <tr>
                <th></th>
                <th className="md:w-2/6 md:px-4 px-2"></th>
                <th>Name</th>
                <th>Created by</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {playlists.map((play, index) => (
                <tr
                  className=" text-gray-100 font-medium  w-full"
                  key={play?.id}
                >
                  <td className="w-10 text-center">{++index}</td>
                  <td className="flex justify-center items-center h-full">
                    <Image
                      src={play?.images[0].url}
                      width={60}
                      height={60}
                      className={`shadow-xl items-center justify-center duration-700 ease-in-out ${
                        false ? "grayscale blur-2xl scale-110" : ""
                      }`}
                      alt="Cover art"
                    />
                  </td>
                  <td className="text-xs md:text-sm md:w-2/6 md:px-0 px-2">
                    <span className="block">
                      <Link href={"#"}>{play?.name}</Link>
                    </span>
                    <small className="md:hidden text-center">
                      {/* {displayArtists} */}
                    </small>
                  </td>
                  <td className="hidden md:table-cell md:text-sm">
                    {play?.owner?.display_name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  try {
    const { refresh_token, access_token } = cookie.parse(
      context.req.headers.cookie
    );

    const res = await axioAPIClient().get("/playlists", {
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
        playlists: items ?? [],
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
export default Playlists;
