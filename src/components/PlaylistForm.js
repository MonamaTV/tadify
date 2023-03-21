const PlaylistForm = ({ handleChange, handleContinue }) => {
  return (
    <div className="flex flex-col w-full md:w-96">
      <div className="w-full my-1">
        <label htmlFor="playlist" className="text-left mb-2 mt-2 text-xs">
          Enter the name of your playlist
        </label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          className="shadow-md px-3 dark:text-white text-gray-900 font-normal outline-none py-3 border  border-gray-900 dark:border-white text-xs dark:bg-[#191414] w-full"
          placeholder="E.g Private School Amapiano"
        />
      </div>
      <div className="w-full my-1">
        <label htmlFor="tracks" className="text-left mb-2 mt-2 text-xs">
          Number of tracks you want
        </label>
        <input
          type="text"
          name="length"
          onChange={handleChange}
          className="shadow-md px-3 dark:text-white text-gray-900 font-normal w-full outline-none py-3 border  border-gray-900 dark:border-white text-xs dark:bg-[#191414]"
          placeholder="1-100"
        />
      </div>
      <button
        onClick={handleContinue}
        className="py-3 px-5 text-xs  bg-[#f43b3b] my-4 text-white"
      >
        Continue
      </button>
    </div>
  );
};

export default PlaylistForm;
