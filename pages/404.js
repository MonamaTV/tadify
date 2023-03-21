import Link from "next/link";
import Meta from "../src/components/Head";

export default function Custom404() {
  return (
    <div className=" dark:bg-background bg-white  w-screen  h-screen flex flex-col justify-center items-center">
      <Meta />
      <h1 className="text-4xl font-bold">NOT FOUND!</h1>
      <h2>Nkare o lahlegile...</h2>
      <div className="flex flex-row justify-between items-center gap-x-2 my-4">
        <Link href={"/"}>
          <a className="bg-primary border-primary text-white text-center px-3 py-1 text-sm w-36">
            Home
          </a>
        </Link>
        <Link href={"/playlists"}>
          <a className=" text-primary px-3 py-1 text-center text-sm w-36">
            Create playlists
          </a>
        </Link>
      </div>
    </div>
  );
}
