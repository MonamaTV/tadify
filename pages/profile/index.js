import Image from "next/image";
import Meta from "../../src/components/Head";
import { useTheme } from "next-themes";
import { getUserAccessData } from "../../src/utils/axios";
import * as cookie from "cookie";
const Profile = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="container">
      <Meta />
      <div className=" flex relative bg-gradient-to-b from-primary dark:to-background text-gray-900 dark:text-white md:px-10 md:py-10 flex-col md:flex-row sm:flex-row">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="absolute right-1 md:right-10 top-4 md:top-8  rounded-lg text-gray-100 text-xs px-4 py-1 md:flex items-center justify-center "
        >
          {theme === "light" ? (
            <Image src={"/sun.png"} width={20} height={20} alt="user theme" />
          ) : (
            <Image src={"/moon.png"} width={20} height={20} alt="user theme" />
          )}
        </button>
        <div className="md:py-1 md:px-0 px-5 py-5 flex md:flex-row  items-center gap-3">
          <Image src="/all.webp" width={"140"} height={"140"} />
          <div className="">
            <h3 className="md:text-5xl font-bold text-3xl select-none">
              Tadima
            </h3>
            <small>12 followers</small>
          </div>
        </div>
      </div>
      <div className="md:p-10 px-5 lg:w-3/5 w-full  pb-20">
        <p className="text-xs w-full">
          NB: Your Spotify profile picture and name will automatically become
          public once you publish your profile. Everyone with your Tadify
          profile link will bbe able to see them.
        </p>
        {/* Form */}
        <form className="container mx-auto">
          <div className="flex flex-col my-2">
            <label
              className="text-gray-900 dark:text-white text-sm my-1 "
              htmlFor="name"
            >
              Username:
              <span className="block text-xs text-red-300">
                *People will be find your profile through this
              </span>
            </label>

            <input
              type="text"
              name="name"
              className="dark:shadow-md px-3 dark:text-white text-gray-900 font-normal outline-none py-3 border  border-gray-900 dark:border-white text-xs w-full dark:bg-background"
              placeholder="stormbreaker"
            />
          </div>
          <div className="flex flex-col my-2">
            <label
              className="text-gray-900 dark:text-white text-sm my-1"
              htmlFor="name"
            >
              Bio:
            </label>
            <textarea
              className="dark:shadow-md px-3 dark:text-white text-gray-900 font-normal outline-none py-3 border  border-gray-900 dark:border-white text-xs w-full dark:bg-background resize-none"
              rows={5}
            ></textarea>
          </div>
          <div className="flex flex-col my-2">
            <label
              className="text-gray-900 dark:text-white text-sm my-1"
              htmlFor="name"
            >
              Choose playlist for your profile:
              <span className="block text-xs text-red-300">
                *People will be able this playlist
              </span>
            </label>
            <select className="dark:shadow-md px-3 dark:text-white text-gray-900 font-normal outline-none py-3 border  border-gray-900 dark:border-white text-xs w-full dark:bg-background">
              <option>RnB official</option>
              <option>Pop music</option>
              <option>For Lovers</option>
            </select>
          </div>
          <div className="flex flex-col my-2">
            <label
              className="text-gray-900 dark:text-white text-sm my-1"
              htmlFor="name"
            >
              Choose stats for your profile:
            </label>
            <select className="dark:shadow-md px-3 dark:text-white text-gray-900 font-normal outline-none py-3 border  border-gray-900 dark:border-white text-xs w-full dark:bg-background">
              <option>RnB official</option>
              <option>Pop music</option>
              <option>For Lovers</option>
            </select>
          </div>
          <div className="flex flex-col my-2">
            <button className="text-xs bg-primary text-white p-3 py-2 w-2/3">
              Save & Publish
            </button>
          </div>
        </form>
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
      props: {},
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
export default Profile;
