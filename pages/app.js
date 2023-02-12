import Image from "next/image";
import Meta from "../src/components/Head";
import { getUserAccessData } from "../src/utils/axios";
import * as cookie from "cookie";
const App = () => {
  return (
    <div className=" bg-[#191414] w-screen  h-screen flex flex-col justify-center items-center">
      <Meta />

      <Image src={"/logo.svg"} width={300} height={70} alt="Logo" />
      <h3 className="text-white text-2xl">Access</h3>
      <p className="text-gray-100 md:w-96 text-center px-2 text-sm">
        In order to use this app, you agree that you are granting it (the app
        "Tadify") access to your Spotify profile. We use your profile data to
        display your favorite artists and tracks as well as your recently played
        tracks.
      </p>
      <br />
      <h3 className="text-white text-2xl">Privacy</h3>
      <p className="text-gray-100 md:w-96 text-center px-2 text-sm">
        This app "Tadify" does not save or process any of your Spotify data to
        any server. You can revoke its access to your Spotify profile{" "}
        <a href="https://www.spotify.com/za-en/account/apps/" target={"_blank"}>
          here
        </a>
      </p>
      <br />
      <a
        href={"/tracks"}
        className="px-10 py-3 bg-[#1db954] text-white rounded-full my-4 no-underline "
      >
        Continue
      </a>
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const { refresh_token } = cookie.parse(context.req.headers.cookie);

    const {
      data: { access_token },
    } = await getUserAccessData(refresh_token);

    return {
      props: { state: true },
    };
  } catch (error) {
    if (error?.response?.data?.error === "invalid_grant") {
      return {
        redirect: {
          permanent: false,
          destination: "/api/login",
        },
      };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/tracks",
        },
      };
    }
  }
}

export default App;
