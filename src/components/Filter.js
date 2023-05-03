import { useState } from "react";

const Filter = ({ handleFilter, filterValue = 1 }) => {
  const [tapButton, setTapButton] = useState(filterValue);
  const fetchTop = (value) => {
    setTapButton(value);

    handleFilter(value);
  };

  return (
    <div className="sticky left-0 top-0 flex flex-row mt-1 py-3 z-30 dark:bg-background bg-white">
      <button
        onClick={() => fetchTop(1)}
        className={`px-3 md:px-5 py-1 ${
          tapButton === 1 ? "bg-primary text-white" : "dark:bg-background"
        } mx-1  dark:text-gray-100 text-xs md:text-sm `}
      >
        Last 4 weeks
      </button>
      <button
        onClick={() => fetchTop(2)}
        className={`px-3 md:px-5 py-1 ${
          tapButton === 2 ? "bg-primary text-white" : "dark:bg-background"
        } mx-1  dark:text-gray-100 text-xs md:text-sm `}
      >
        Last 6 months
      </button>
      <button
        onClick={() => fetchTop(3)}
        className={`px-3 md:px-5 py-1 ${
          tapButton === 3 ? "bg-primary text-white" : "dark:bg-background"
        } mx-1  dark:text-gray-100 text-xs md:text-sm `}
      >
        All time
      </button>
    </div>
  );
};

export default Filter;
