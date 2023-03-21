const InputPlaylist = ({ value, handleChange, handleContinue }) => {
  return (
    <div className="flex flex-col w-full md:w-96">
      <p className="text-left mb-2 mt-2 text-sm">
        Enter the name of your playlist
      </p>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="shadow-md px-3 dark:text-white font-normal outline-none py-3 border border-gray-900 dark:border-white text-xs dark:bg-[#191414] w-full"
        placeholder="E.g Private School Amapiano"
      />
      <button
        onClick={handleContinue}
        className="py-3 px-5 text-xs  bg-primary my-4 text-white"
      >
        Continue
      </button>
    </div>
  );
};

export default InputPlaylist;
