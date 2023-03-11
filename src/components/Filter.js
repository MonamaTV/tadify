import { useState } from "react";

const Filter = ({ handleFilter }) => {
  const [tapButton, setTapButton] = useState(1);
  const fetchTop = (value) => {
    setTapButton(value);

    handleFilter(value);
  };

  return (
    <div className="flex flex-row mt-10">
      <button
        onClick={() => fetchTop(1)}
        className={`px-3 md:px-5 py-1 ${
          tapButton === 1 ? "bg-[#1db954]" : "dark:bg-[#191414]"
        } mx-1 text-gray-900 dark:text-gray-100 text-xs md:text-sm `}
      >
        Last 4 weeks
      </button>
      <button
        onClick={() => fetchTop(2)}
        className={`px-3 md:px-5 py-1 ${
          tapButton === 2 ? "bg-[#1db954]" : "dark:bg-[#191414]"
        } mx-1 text-gray-900 dark:text-gray-100 text-xs md:text-sm `}
      >
        Last 6 months
      </button>
      <button
        onClick={() => fetchTop(3)}
        className={`px-3 md:px-5 py-1 ${
          tapButton === 3 ? "bg-[#1db954]" : "dark:bg-[#191414]"
        } mx-1 text-gray-900 dark:text-gray-100 text-xs md:text-sm `}
      >
        All time
      </button>
    </div>
  );
};

export default Filter;
