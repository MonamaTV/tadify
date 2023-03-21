import Track from "../../src/components/Track";
import * as cookie from "cookie";
import {
  axioAPIClient,
  axiosClient,
  getUserAccessData,
} from "../../src/utils/axios";
import Meta from "../../src/components/Head";
import DynamicImage from "../../src/components/Image";
import Link from "next/link";
import { useTheme } from "next-themes";
import Image from "next/image";
import TracksLoading from "../../src/components/TracksLoading";

const Plays = (props) => {
  const tracks = props.tracks?.map((track) => track.track) ?? [];
  const { theme, setTheme } = useTheme();
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

  if (!props) {
    return <TracksLoading />;
  }

  if (tracks.length < 0 || !tracks) {
    return (
      <>
        <Meta />
        <div className="flex w-full justify-center items-center h-screen  relative dark:bg-gradient-to-b from-primary to-[#191414] text-white p-10  flex-col ">
          <h3 className="font-bold text-2xl">
            It seems like you do not have any data yet...{" "}
          </h3>
          <Link href="/tracks">
            <a className="inline-block  border px-2 py-1 border-white">
              Go back home
            </a>
          </Link>
        </div>
      </>
    );
  }

  return (
    <div>
      <Meta />

      <div className="flex w-full relative bg-gradient-to-b from-primary dark:to-[#191414] text-gray-900 dark:text-white md:p-10  flex-col md:flex-row sm:flex-row">
        <DynamicImage imgUrl={extractTopTrack()?.cover} />
        <div className="flex flex-col justify-center px-8 md:pl-10 md:w-5/6 sm:pl-10">
          <p className="my-2 mt-4 sm:my-4 text-sm sm:text-base">No. 1</p>
          <h2 className="md:text-5xl font-bold text-2xl select-none">
            <Link href={extractTopTrack().uri}>{extractTopTrack().name}</Link>
          </h2>
          <h4 className="my-2 sm:my-4 text-sm sm:text-base ">
            <Link href={extractTopTrack().uri}>
              {extractTopTrack().displayArtists}
            </Link>
          </h4>
        </div>
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
      </div>
      <div className="py-1 px-5 md:px-10 dark:bg-gradient-to-b from-[#191414] to-[#191414] pb-12">
        <div>
          <table className="my-2 w-full md:w-3/4 border-separate border-spacing-y-3 border-spacing-x-0">
            <thead className="hidden md:table-header-group  w-full text-left px-5 h-14 dark:text-gray-100 text-gray-900">
              <tr>
                <th></th>
                <th></th>
                <th className="md:w-2/6 md:px-4 px-2">Track ID</th>
                <th>Artist</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {tracks.slice(1, tracks.length).map((track, index) => (
                <Track track={track} key={track.id + index} pos={++index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps(context) {
  try {
    const { refresh_token } = cookie.parse(context.req.headers.cookie);

    const {
      data: { access_token },
    } = await getUserAccessData(refresh_token);

    const res = await axiosClient().get("/me/player/recently-played", {
      params: {
        limit: 20,
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
export default Plays;
