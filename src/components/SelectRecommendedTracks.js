import Button from "./Button";

const SelectRecommendedTracks = ({ options, handleAdd, handleContinue }) => {
  return (
    <div className="space-x-2 px-1 md:w-2/5 flex flex-row flex-wrap justify-center items-center">
      {options.map((opt) => (
        <Button
          handleAdd={handleAdd}
          id={opt.id}
          name={opt.name}
          key={opt.id}
          url={opt.url}
          initial={true}
        />
      ))}

      {/*  */}
      <br />

      <div className="space-x-2  flex flex-row w-full justify-center">
        <button className="py-2 rounded-3xl px-5 text-xs border text-red-600  border-[red] my-4">
          Cancel
        </button>
        <button
          onClick={handleContinue}
          className="py-2 rounded-3xl px-5 text-xs  bg-[#1db954] my-4"
        >
          Create playlist
        </button>
      </div>
    </div>
  );
};
export default SelectRecommendedTracks;
