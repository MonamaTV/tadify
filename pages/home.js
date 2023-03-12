import * as cookie from "cookie";
import Image from "next/image";
import Meta from "../src/components/Head";
import { axioAPIClient } from "../src/utils/axios";
const RedirectUser = () => {
  return (
    <div className=" dark:bg-[#191414] bg-white  w-screen  h-screen flex flex-col justify-center items-center">
      <Meta />

      <Image src={"/logo.svg"} width={300} height={70} alt="Logo" />
      <h3 className="dark:text-white text-gray-900  text-2xl">Access</h3>
      <p className="dark:text-gray-100 text-gray-600 md:w-96 text-center px-2 text-sm">
        In order to use this app, you agree that you are granting it access to
        your Spotify profile. We use your profile data to display your favorite
        artists and tracks as well as your recently played tracks. And we will
        have the functionality or ability to create playlists on your
        behalf/account, given you have granted the app access to your Spotify
        account.
      </p>
      <br />
      <h3 className="dark:text-white text-gray-900 text-2xl">Privacy</h3>
      <p className="dark:text-gray-100 text-gray-600 md:w-96 text-center px-2 text-sm">
        This Tadify app does not save or process any of your Spotify data to any
        server. You can revoke its access to your Spotify profile
        <a
          href="https://www.spotify.com/za-en/account/apps/"
          rel="noreferrer"
          target={"_blank"}
          className="text-blue-500 font-bold"
        >
          here...
        </a>
      </p>
      <br />
      <a
        href={"/tracks"}
        className="px-10 py-2 bg-[#1db954] text-white  my-4 no-underline "
      >
        Open the portal
      </a>
    </div>
  );
};

export async function getServerSideProps(context) {
  const code = context.query.code;
  //If the callback does not contain a code
  if (!code) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  try {
    const res = await axioAPIClient().post("/login", {
      code,
    });

    if (res.status !== 200) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }

    const { data } = res.data;

    const accessCookie = cookie.serialize("access_token", data.access, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: data.expires_in,
      path: "/",
    });

    const refreshCookie = cookie.serialize("refresh_token", data.refresh, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    context.res.setHeader("Set-Cookie", [accessCookie, refreshCookie]);

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
    }
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
}

export default RedirectUser;
