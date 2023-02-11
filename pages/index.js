import Image from "next/image";

const Home = () => {
  const loginUser = async () => {
    window.location.href = "/api/login";
  };

  return (
    <div className=" bg-[#191414] w-screen  h-screen flex flex-col justify-center items-center">
      <Image src={"/logo.svg"} width={300} height={70} alt="Logo" />
      <p className="text-gray-100 md:w-96 text-center px-2 text-sm">
        Welcome... if you have wondered what's been your music pallete in last
        couple of months? You have come to the right place!
      </p>
      <button
        onClick={loginUser}
        className="px-10 py-3 bg-[#1db954] text-white rounded-full my-4"
      >
        Continue With Spotify
      </button>
    </div>
  );
};

export default Home;
