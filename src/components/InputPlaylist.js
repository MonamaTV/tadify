const InputPlaylist = ({ value, handleChange, handleContinue }) => {
  return (
    <div className="flex flex-col w-full md:w-80">
      <p className="text-left mb-2 mt-2 text-sm">
        Enter the name of your playlist
      </p>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="shadow-md px-3 text-white font-normal outline-none py-3 border  border-white text-xs bg-[#191414]"
        placeholder="E.g Private School Amapiano"
      />
      <button
        onClick={handleContinue}
        className="py-3 px-5 text-xs  bg-[#1db954] my-4"
      >
        Continue
      </button>
    </div>
  );
};

export default InputPlaylist;
