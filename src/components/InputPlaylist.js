const InputPlaylist = ({ value, handleChange, handleContinue }) => {
  return (
    <div className="flex flex-col w-3/4 md:w-80">
      <p className="text-center mb-2">Enter the name of your playlist</p>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="rounded-3xl shadow-md px-3 text-gray-800 font-normal py-3 border-none outline-none text-xs"
        placeholder="E.g Private School Amapiano"
      />
      <button
        onClick={handleContinue}
        className="py-3 rounded-3xl px-5 text-xs  bg-[#1db954] my-4"
      >
        Continue
      </button>
    </div>
  );
};

export default InputPlaylist;