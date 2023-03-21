import * as cookie from "cookie";
import { useTheme } from "next-themes";
import Image from "next/image";
import Meta from "../src/components/Head";
import { axioAPIClient } from "../src/utils/axios";
const RedirectUser = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const userTheme = theme ?? systemTheme;
  return (
    <div className=" dark:bg-gradient-to-b from-background via-background to-background   w-screen  h-screen flex flex-col justify-center items-center ">
      <Meta />
      <button
        onClick={() => setTheme(userTheme === "light" ? "dark" : "light")}
        className="absolute top-10 right-10 bg-inherit border-none outline-none"
      >
        {userTheme === "light" ? (
          <Image src={"/sun.png"} width={20} height={20} alt="user theme" />
        ) : (
          <Image src={"/moon.png"} width={20} height={20} alt="user theme" />
        )}
      </button>
      {userTheme === "light" ? (
        <Image
          src={"/logodark.svg"}
          width={300}
          height={70}
          alt="Logo"
          className="mb-"
        />
      ) : (
        <Image
          src={"/logolight.svg"}
          width={300}
          height={70}
          alt="Logo"
          className="mb-"
        />
      )}

      <div className="md:w-[500px] sm:dark:bg-[#2520206f] px-7 py-5">
        <h3 className="dark:text-white text-gray-900 font-semibold ">ACCESS</h3>
        <p className=" text-gray-400 text-xs">
          In order to use this app, you agree that you are granting it access to
          your Spotify profile. We use your Spotify profile data to display your
          favorite artists and tracks as well as your recently played tracks.
          And we will have the functionality or ability to create playlists on
          your behalf/account, given you have granted the app access to your
          Spotify account.
        </p>
      </div>
      <br />
      <div className="md:w-[500px] sm:dark:bg-[#2520206f] px-7 py-5">
        <h3 className="dark:text-white text-gray-900 font-semibold">PRIVACY</h3>
        <p className=" text-gray-400 text-xs">
          This Tadify app does not save or process any of your Spotify data to
          any server. You can revoke its access to your Spotify profile{" "}
          <a
            href="https://www.spotify.com/za-en/account/apps/"
            rel="noreferrer"
            target={"_blank"}
            className="text-blue-500 underline "
          >
            here...
          </a>
        </p>
      </div>
      <br />
      <a
        href={"/tracks"}
        className="px-10 py-2 bg-primary text-white text-sm  no-underline text-center"
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
