import Image from "next/image";
import Meta from "../../src/components/Head";
import { useTheme } from "next-themes";
import { axiosClient, getUserAccessData } from "../../src/utils/axios";
import * as cookie from "cookie";
import prisma from "../../src/utils/prisma";
import { useEffect, useState } from "react";
import axios from "axios";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Profile = (props) => {
  const { theme, setTheme } = useTheme();

  const [disabled, setDisabled] = useState(false);
  const [exists, setExists] = useState(false);
  const [user, setUser] = useState({
    username: "",
    bio: props.spotifyUser?.bio || "",
    playlistId: props.spotifyUser?.playlistId || "",
  });
  const debouncedValue = useDebounce(user.username, 500);

  useEffect(() => {
    const checkUsername = async () => {
      try {
        const response = await axios.get(
          `/api/username?username=${debouncedValue}&spotifyUserId=${props.user.uri}`
        );
        setExists(response.data.data.exists);
      } catch (error) {
        console.log(error);
      }
    };
    checkUsername();
  }, [debouncedValue]);

  const handleUserInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitUserDetails = async (e) => {
    e.preventDefault();
    setDisabled(true);

    try {
      const response = await axios.post("/api/users", {
        ...user,
        spotifyUserId: props.user.uri,
        name: props.user.display_name,
      });
      console.log({ response });
      // const { data } = response;
    } catch (error) {
      console.log(error);
    }
    setDisabled(false);
  };

  return (
    <div className="container flex flex-col md:flex-row-reverse">
      <Meta />
      <div className="flex relative bg-gradient-to-b from-primary dark:to-background text-gray-900 dark:text-white md:px-10 md:py-10 flex-row p-10 items-center md:flex-col sm:flex-row sm:w-1/3">
        <div className="w-1/2 md:w-full">
          <Image
            src={props.user.images[0].url}
            width={"340"}
            height={"340"}
            className="object-fill"
          />
        </div>
        <div className="md:py-10 md:px-0 px-5 py-5 md:flex-row gap-3">
          <div className="">
            <h3 className="md:text-5xl font-bold text-3xl select-none">
              {props.user.display_name}
            </h3>
            <small>{props.user.followers.total} followers</small>
          </div>
        </div>
      </div>
      {/* <div className="md:hidden flex bg-gradient-to-b from-primary dark:to-background flex-col md:w-5/6 p-8 py-7 md:p-0 mb-5">
        <h2 className="md:text-5xl font-bold text-4xl select-none">
          Create public profile
        </h2>
        <div className="my-3 flex"></div>
      </div> */}
      <div className="md:p-10 px-5 lg:w-3/5 w-full  pb-20">
        <p className="text-xs w-full">
          NB: Your Spotify profile picture and name will automatically become
          public once you publish your profile. Everyone with your Tadify
          profile link will be able to see them.
        </p>
        {/* Form */}
        <form className="container mx-auto">
          <div className="flex flex-col my-2">
            <label
              className="text-gray-900 dark:text-white text-sm my-1 "
              htmlFor="username"
            >
              Username:
            </label>

            <input
              type="text"
              name="username"
              defaultValue={props.spotifyUser?.username}
              className="dark:shadow-md px-3 dark:text-white text-gray-900 font-normal outline-none py-3 border  border-gray-900 dark:border-white text-xs w-full dark:bg-background mt-1"
              placeholder={props.spotifyUser?.username || "Drake"}
              onChange={handleUserInput}
            />
            {exists ? (
              <span className="text-xs text-red-300 underline">
                {debouncedValue} already exists
              </span>
            ) : null}
          </div>
          <div className="flex flex-col my-2">
            <label
              className="text-gray-800 dark:text-white text-sm my-1"
              htmlFor="name"
            >
              Bio:
            </label>
            <textarea
              defaultValue={props.spotifyUser?.bio}
              className="dark:shadow-md px-3 dark:text-white text-gray-900 font-normal outline-none py-3 border  border-gray-900 dark:border-white text-xs w-full dark:bg-background resize-none"
              rows={5}
              name="bio"
              placeholder={
                props.spotifyUser?.bio ||
                "E.g I am a musical genius. Unearthing the best talent."
              }
              onChange={handleUserInput}
            ></textarea>
          </div>
          <div className="flex flex-col mt-2">
            <label
              className="text-gray-900 dark:text-white text-sm"
              htmlFor="name"
            >
              Choose playlist for your profile:
              <span className="block text-xs text-red-300">
                *People will be able to see this playlist
              </span>
            </label>
            <select
              name="playlistId"
              defaultValue={props.spotifyUser?.playlistId}
              onChange={handleUserInput}
              className="dark:shadow-md px-3 dark:text-white text-gray-900 font-normal outline-none py-3 border  border-gray-900 dark:border-white text-xs w-full dark:bg-background my-2"
            >
              {props.playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col mt-1">
            <button
              disabled={disabled || exists}
              onClick={handleSubmitUserDetails}
              className="text-xs bg-primary disabled:bg-[#f43b3b]/10 text-white p-3 py-3 "
            >
              {disabled ? "Saving..." : "Save & Publish"}
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
    const { data: user } = await axiosClient().get("/me", {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });

    const spotifyUserData = prisma.user.findUnique({
      where: {
        spotifyUserId: user.uri,
      },
    });

    const userPlaylists = axiosClient().get("/me/playlists", {
      params: {
        limit: 30,
      },
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
    //Two promises
    const [spotifyUser, playlists] = await Promise.allSettled([
      spotifyUserData,
      userPlaylists,
    ]);

    return {
      props: {
        user,
        spotifyUser: spotifyUser.value,
        playlists: playlists.value.data.items ?? [],
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
export default Profile;
