import { useState } from "react";

const Filter = ({ handleFilter, filterValue = 1 }) => {
  const [tapButton, setTapButton] = useState(filterValue);
  const fetchTop = (value) => {
    setTapButton(value);

    handleFilter(value);
  };

  return (
    <div className="flex flex-row mt-10">
      <button
        onClick={() => fetchTop(1)}
        className={`px-3 md:px-5 py-1 ${
          tapButton === 1 ? "bg-[#f43b3b] text-white" : "dark:bg-[#191414]"
        } mx-1  dark:text-gray-100 text-xs md:text-sm `}
      >
        Last 4 weeks
      </button>
      <button
        onClick={() => fetchTop(2)}
        className={`px-3 md:px-5 py-1 ${
          tapButton === 2 ? "bg-[#f43b3b] text-white" : "dark:bg-[#191414]"
        } mx-1  dark:text-gray-100 text-xs md:text-sm `}
      >
        Last 6 months
      </button>
      <button
        onClick={() => fetchTop(3)}
        className={`px-3 md:px-5 py-1 ${
          tapButton === 3 ? "bg-[#f43b3b] text-white" : "dark:bg-[#191414]"
        } mx-1  dark:text-gray-100 text-xs md:text-sm `}
      >
        All time
      </button>
    </div>
  );
};

export default Filter;
