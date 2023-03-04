import { axiosClient, getUserAccessData } from "../../src/utils/axios";
import * as cookie from "cookie";
import Tap from "../../src/components/Tap";
import { colors } from "../../src/utils/app";
export default function Create(props) {
  return (
    <div
      className={`absolute top-0 left-0 w-screen md:border-l border-[#191919] min-h-screen bg-gradient-to-b gradient via-[#191414] ${props.color} to-[#191414] flex flex-col justify-center items-center text-white`}
    >
      <h1 className="text-4xl font-bold">Create new playlist</h1>
      <p className="text-sm my-1">Select artists you want in the playlist</p>
      <br />

      <Tap artists={props.artists} />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const { refresh_token } = cookie.parse(context.req.headers.cookie);

    const {
      data: { access_token },
    } = await getUserAccessData(refresh_token);

    //Get time_range

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
