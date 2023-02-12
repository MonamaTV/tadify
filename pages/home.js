import axios from "axios";
import * as cookie from "cookie";
import Meta from "../src/components/Head";
import { axioAPIClient } from "../src/utils/axios";
const RedirectUser = () => {
  return (
    <div className=" bg-[#191414] w-screen  h-screen flex flex-col justify-center items-center">
      <h1 className="text-white font-bold text-3xl">Loading...</h1>
      <Meta />
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

    const { code: status, success, data } = res.data;

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

    if (status === 200 && success) {
      return {
        redirect: {
          permanent: false,
          destination: "/tracks",
        },
      };
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  // //Go baizisa Next
  // return {
  //   props: {},
  // };
}

export default RedirectUser;
