import Image from "next/image";
import Meta from "../src/components/Head";
import * as cookie from "cookie";
import { getUserAccessData } from "../src/utils/axios";
import Link from "next/link";
import { useTheme } from "next-themes";

const Home = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const userTheme = theme ?? systemTheme;
  return (
    <div className="relative dark:bg-gradient-to-b from-[#191414] via-[#191414] to-[#191414] bg-white min-h-screen flex flex-col transition-colors ease-in-out duration-700">
      <Meta />
      <header className="flex flex-row items-center justify-between  container mx-auto py-2 px-3 md:px-20">
        {userTheme === "light" ? (
          <Image
            src={"/logodark.svg"}
            width={80}
            height={70}
            alt="Logo in dark mode"
          />
        ) : (
          <Image
            src={"/logolight.svg"}
            width={80}
            height={70}
            alt="Logo in light mode"
          />
        )}
        <nav className="flex items-center gap-x-5">
          <Link href="/api/login">
            <a className="bg-[#1db954] px-3 text-white border-[#1db954] py-1 text-sm outline outline-none">
              Login with Spotify
            </a>
          </Link>
          <button
            onClick={() => setTheme(userTheme === "light" ? "dark" : "light")}
            className="focus:outline border-none"
          >
            {userTheme === "light" ? (
              <Image src={"/sun.png"} width={20} height={20} alt="user theme" />
            ) : (
              <Image
                src={"/moon.png"}
                width={20}
                height={20}
                alt="user theme"
              />
            )}
          </button>
        </nav>
      </header>
      <section className="mb-10 flex flex-col-reverse md:flex-row 2xl:px-32 md:px-20 items-center container mx-auto justify-center mt-3 image">
        {userTheme === "light" ? (
          <Image
            className="w-1/3 shadow-2xl shadow-red-900"
            src={"/backgroud-min.png"}
            width={350}
            height={550}
            alt="Section"
          />
        ) : (
          <Image
            className="w-1/3 shadow-lg"
            src={"/back1-min.png"}
            width={350}
            height={550}
            alt="Section"
          />
        )}
        <div className="md:px-10 sm:w-[500px] md:w-max">
          <div className="md:dark:bg-[#2520206f] my-3 px-5 py-5 space-y-0 xl:w-[700px] md:px-10">
            <Image src={"/air.png"} width={30} height={30} alt="music" />
            <h1 className="text-gray-900 font-semibold uppercase dark:text-gray-100">
              See your music taste
            </h1>
            <p className="text-gray-400 text-xs">
              Look back in time to see who has been your favorite artists, the
              tracks you have been listening to religiously.
            </p>
          </div>
          <div className="md:dark:bg-[#2520206f] my-3 px-5 py-5 space-y-0 xl:w-[700px] md:px-10">
            <Image src={"/ai.png"} width={30} height={30} alt="music" />
            <h1 className="text-gray-900 dark:text-gray-100 font-semibold uppercase">
              Create playlists
            </h1>
            <p className="text-gray-400 text-xs">
              With the power of AI, you can create playlists that you can only
              imagine. Create the ultimate soundtracks for any occasion.
            </p>
          </div>
          <div className="md:dark:bg-[#2520206f] my-3 px-5 py-5 space-y-0 xl:w-[700px] md:px-10">
            <Image src={"/track.png"} width={30} height={30} alt="music" />
            <h1 className="text-gray-900 font-semibold uppercase dark:text-gray-100">
              Music recommendation
            </h1>
            <p className="text-gray-400 text-xs">
              Discover your new favorite tracks with personalized music
              recommendations. Let us guide you to the perfect sound based on
              your unique music taste and preferences!
            </p>
          </div>
        </div>
      </section>
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
