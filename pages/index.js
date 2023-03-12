import Image from "next/image";
import Meta from "../src/components/Head";
import * as cookie from "cookie";
import { getUserAccessData } from "../src/utils/axios";
import Link from "next/link";
import { useTheme } from "next-themes";

const Home = () => {
  const { systemTheme } = useTheme();

  return (
    <div className=" dark:bg-[#191414] w-screen  h-screen flex flex-col justify-center items-center">
      <Meta />
      {systemTheme === "light" ? (
        <Image src={"/logo1.svg"} width={300} height={70} alt="Logo" />
      ) : (
        <Image src={"/logo.svg"} width={300} height={70} alt="Logo" />
      )}

      <p className="dark:text-gray-100 text-gray-600 md:w-96 text-center px-2 text-sm">
        Welcome... if you have wondered what has been your music pallete in last
        couple of months? You have come to the right place!
      </p>
      <Link href="/api/login">
        <a className="px-10 py-2 bg-[#1db954] text-white  my-4 no-underline">
          Continue With Spotify
        </a>
      </Link>
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const { refresh_token } = cookie.parse(context.req.headers.cookie);
    const {
      data: { access_token },
    } = await getUserAccessData(refresh_token);

    if (access_token) {
      return {
        redirect: {
          permanent: false,
          destination: "/tracks",
        },
      };
    }
    return {
      props: { data: [] },
    };
  } catch (error) {
    return {
      props: { data: [] },
    };
  }
}

export default Home;
