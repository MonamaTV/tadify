import * as cookie from "cookie";
import { colors } from "../../src/utils/app";
import { getUserAccessData } from "../../src/utils/axios";
import Meta from "../../src/components/Head";
import Suggestions from "../../src/components/Suggestions";

const Suggest = (props) => {
  return (
    <>
      <Meta />
      <div
        className={`absolute top-0 left-0 w-screen md:border-l border-[#191919] min-h-screen bg-gradient-to-b gradient ${props.color} via-[#191414]  to-[#191414] flex flex-col justify-center items-center text-white pt-16 px-7`}
      >
        <h1 className="text-4xl font-bold">Create new playlist</h1>
        <Suggestions />
        <br />
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  try {
    const { refresh_token } = cookie.parse(context.req.headers.cookie);
    const {
      data: { access_token },
    } = await getUserAccessData(refresh_token);

    //If user removed the app, start the auth again
    if (!access_token) {
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
export default Suggest;
