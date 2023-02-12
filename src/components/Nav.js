import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();
  return (
    <>
      <div className="hidden md:block h-screen w-1/6 fixed bg-[#191414] px-10 pt-20 ">
        <Image src={"/logo.svg"} width={80} height={90} alt="Logo" />
        <ul className="my-4 list-none text-white text-sm space-y-5">
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
      <div className="md:hidden fixed bottom-0 bg-gradient-to-b from-[#191414d6] to-[#191414] w-screen z-20 h-14">
        <ul className="py-2 list-none flex flex-row text-white text-xs w-full justify-evenly items-start">
          <li>
            <Link href={"/tracks"}>
              <a className="flex items-center gap-2 flex-col text-xs w-32">
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
              <a className="flex items-center gap-2 flex-col text-xs w-32">
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
            <Link href={"/plays"}>
              <a className="flex items-center gap-2 flex-col text-xs w-32">
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
