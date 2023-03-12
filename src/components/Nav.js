import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();
  const { theme, _ } = useTheme();
  return (
    <>
      <div className="hidden md:block h-screen w-1/6 fixed dark:bg-[#191414] px-10 pt-20 transition-colors ease-in-out duration-400">
        {theme === "light" ? (
          <Image src={"/logo1.svg"} width={80} height={90} alt="Logo" />
        ) : (
          <Image src={"/logo.svg"} width={80} height={90} alt="Logo" />
        )}
        <ul className="my-4 list-none text-gray-900 dark:text-white text-sm space-y-5">
          <li>
            <Link href={"/tracks"}>
              <a className="flex items-center gap-3">
                <Image
                  src={
                    router.pathname === "/tracks"
                      ? "/gartists.png"
                      : "/artists.png"
                  }
                  width={20}
                  height={20}
                  alt="Tracks"
                />{" "}
                Fav tracks
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/artists"}>
              <a className="flex items-center gap-3">
                <Image
                  src={
                    router.pathname === "/artists"
                      ? "/gfavorite.png"
                      : "/favorite.png"
                  }
                  width={20}
                  height={20}
                  alt="Artists"
                />{" "}
                Fav artists
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/playlists"}>
              <a className="flex items-center gap-3">
                <Image
                  src={
                    router.pathname === "/playlists" ? "/gadd.png" : "/add.png"
                  }
                  width={20}
                  height={20}
                  alt="Artists"
                />{" "}
                Playlists
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/plays"}>
              <a className="flex items-center gap-3">
                <Image
                  src={
                    router.pathname === "/plays" ? "/gplay.png" : "/play.png"
                  }
                  width={20}
                  height={20}
                  alt="Plays"
                />{" "}
                Recent plays
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="md:hidden fixed bottom-0 bg-white bg-gradient-to-b dark:from-[#191414] dark:to-[#191414fa] w-screen z-20 h-14 opacity-95 transition-colors ease-in-out duration-400">
        <ul className="py-2 list-none flex flex-row text-gray-900 dark:text-white text-xs w-full justify-evenly items-start">
          <li>
            <Link href={"/tracks"}>
              <a className="flex items-center gap-2 flex-col text-xs w-20">
                <Image
                  src={
                    router.pathname === "/tracks"
                      ? "/gartists.png"
                      : "/artists.png"
                  }
                  width={20}
                  height={20}
                  alt="Tracks"
                />{" "}
                Fav tracks
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/artists"}>
              <a className="flex items-center gap-2 flex-col text-xs w-20">
                <Image
                  src={
                    router.pathname === "/artists"
                      ? "/gfavorite.png"
                      : "/favorite.png"
                  }
                  width={20}
                  alt="Artists"
                  height={20}
                />{" "}
                Fav artists
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/playlists"}>
              <a className="flex items-center gap-2 flex-col text-xs w-20">
                <Image
                  src={
                    router.pathname === "/playlists" ? "/gadd.png" : "/add.png"
                  }
                  width={20}
                  alt="Artists"
                  height={20}
                />{" "}
                Playlists
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/plays"}>
              <a className="flex items-center gap-2 flex-col text-xs w-20">
                <Image
                  src={
                    router.pathname === "/plays" ? "/gplay.png" : "/play.png"
                  }
                  width={20}
                  height={20}
                  alt="Plays"
                />{" "}
                Recent plays
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Nav;
