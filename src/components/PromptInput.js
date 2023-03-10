const PromptInput = ({ value, handleChange, handleContinue }) => {
  return (
    <>
      <p className="text-sm my-1">
        Describe the kind of music you want in your playlist
      </p>
      <textarea
        placeholder="E.g popular Hip Hop music in South Africa"
        className="border border-white  shadow-xl w-full md:w-96 resize-none outline-none text-white px-3 py-4 text-sm mt-3 bg-[#191414]"
        rows={6}
        value={value}
        type={"text"}
        onChange={handleChange}
      ></textarea>
      <button
        onClick={handleContinue}
        className="py-3 px-5 text-xs w-full md:w-96 bg-[#1db954] my-4 "
      >
        Continue
      </button>
    </>
  );
};

export default PromptInput;
