import Image from "next/image";
import Meta from "../../src/components/Head";
import { useTheme } from "next-themes";
import { axiosClient, getUserAccessData } from "../../src/utils/axios";
import * as cookie from "cookie";
import prisma from "../../src/utils/prisma";
import Track from "../../src/components/Track";

const Profile = ({ items, playlistInfo }) => {
  return (
    <div className="w-full flex flex-col md:flex-col">
      <Meta />
      <div className="flex relative bg-gradient-to-b from-primary dark:to-background text-gray-900 dark:text-white md:p-10 p-10  flex-row">
        <div className="px-10">
          <Image
            src={playlistInfo?.image}
            width={"240"}
            height={"240"}
            className="object-fill px-5"
          />
        </div>
        <div className="md:py-10 md:px-0 px-5 py-5 md:flex-row gap-3 mx-10">
          <div className="">
            <h5>Public playlist</h5>
            <h3 className="md:text-5xl font-bold text-3xl select-none">
              {playlistInfo.name}
            </h3>
            <small>{items?.length} tracks</small>
          </div>
        </div>
      </div>

      <div className="md:p-10 px-5 w-full dark:bg-gradient-to-b dark:from-background dark:to-background  pb-20">
        <div className="py-1 px-5 md:px-10  pb-12 relative">
          <div>
            <table className="my-2 w-full md:w-3/4 border-separate border-spacing-y-3 border-spacing-x-0">
              <thead className="hidden md:table-header-group  w-full text-left px-5 h-14 text-gray-800 dark:text-gray-100">
                <tr>
                  <th></th>
                  <th></th>
                  <th className="md:w-2/6 md:px-4 px-2">Track ID</th>
                  <th>Artist</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {items?.map((track, index) => (
                  <Track track={track} key={track.id} pos={++index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps(context) {
  try {
    const {
      query: { username },
    } = context;

    const { refresh_token } = cookie.parse(context.req.headers.cookie);

    const dataPromise = getUserAccessData(refresh_token);
    const userPromise = prisma.user.findUnique({
      where: {
        username: username.toLowerCase(),
      },
    });

    const [data, user] = await Promise.allSettled([dataPromise, userPromise]);

    if (data.status === "rejected" || user.status === "rejected") {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }

    const { access_token } = data.value.data;
    const { playlistId } = user.value;
    const playlist = await axiosClient().get(`/playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const tracks = playlist.data.tracks.items.map((track) => track.track);
    return {
      props: {
        items: tracks,
        playlistInfo: {
          name: playlist.data.name,
          image: playlist.data.images[0].url,
          owner: playlist.data.owner.display_name,
        },
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: `/api/login?state=${context.resolvedUrl}`,
      },
    };
  }
}
export default Profile;
