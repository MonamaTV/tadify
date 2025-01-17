import { axiosClient, getUserAccessData } from "../../src/utils/axios";
import * as cookie from "cookie";
import Tap from "../../src/components/Tap";
import { colors } from "../../src/utils/app";
import Meta from "../../src/components/Head";
import Link from "next/link";

export default function Create(props) {
  if (props.artists.length < 1 || !props.artists) {
    return (
      <>
        <Meta />
        <div className="flex w-full justify-center items-center h-screen  relative back:bg-gradient-to-b dark:from-primary dark:via-background dark:to-background dark:text-white text-gray-900 p-10 bg-white   flex-col ">
          <h3 className="font-bold text-2xl">
            It seems like you do not have any data on Spotfy yet...{" "}
            <Link href="/playlists/suggest">
              <a className="block text-sm border font-normal w-56 px-3 py-2 my-2">
                Try out describing playlists
              </a>
            </Link>
          </h3>
        </div>
      </>
    );
  }

  return (
    <>
      <Meta />
      <div
        className={`absolute top-0 left-0 w-screen md:border-l border-[#191919] min-h-screen bg-white dark:bg-gradient-to-b gradient via-white dark:via-background ${props.color} dark:to-background flex flex-col justify-center md:items-center dark:text-white pt-16 px-7`}
      >
        <h1 className="text-4xl font-bold text-left">Create new playlist</h1>
        <Tap artists={props.artists} />
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const { refresh_token } = cookie.parse(context.req.headers.cookie);

    const {
      data: { access_token },
    } = await getUserAccessData(refresh_token);

    const { data, status } = await axiosClient().get("/me/top/artists", {
      params: {
        limit: 20,
      },
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });

    if (status !== 200) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
    return {
      props: {
        color: colors[Math.floor(Math.random() * colors.length)],
        artists: data.items ?? [],
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
};
