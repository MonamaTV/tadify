const TracksLoading = () => {
  return (
    <>
      <div
        className={`flex w-full relative bg-gradient-to-b dark:to-[#191414] text-gray-900 dark:text-white md:p-10 flex-col md:flex-row sm:flex-row transition-colors ease-in-out duration-400  animate-pulse`}
      >
        <div className="dark:bg-white/5 bg-gray-900/10 w-full h-52 md:w-52 md:h-52 "></div>
        <div className="flex flex-col justify-center px-8 md:pl-10 md:w-5/6 sm:pl-10 ">
          <p className="bg-gray-900/10 my-2 mt-4 sm:my-4 text-sm sm:text-base dark:bg-rose-100/10 w-32 h-4"></p>
          <h2 className="bg-gray-900/10 md:text-5xl font-bold text-2xl select-none dark:bg-rose-100/10 w-72 h-10"></h2>
          <h4 className="bg-gray-900/10 my-2 sm:my-4 text-sm sm:text-base dark:bg-rose-100/10 w-52 h-4"></h4>
        </div>
      </div>
      <div className="py-1 px-5 md:px-10 dark:bg-gradient-to-b dark:from-[#191414] dark:to-[#191414] pb-12 animate-pulse">
        <div>
          <table className="my-2 w-full md:w-3/4 border-separate border-spacing-y-3 border-spacing-x-0">
            <thead className="hidden md:table-header-group  w-full text-left px-5 h-14 text-gray-800 dark:text-gray-100">
              <tr>
                <th></th>
                <th></th>
                <th className="md:w-2/6 md:px-4 px-2">
                  <p className="bg-gray-900/10 dark:bg-rose-100/10 w-32 h-4"></p>
                </th>
                <th>
                  <p className="bg-gray-900/10 dark:bg-rose-100/10 w-32 h-4"></p>
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              <tr className=" text-gray-900 dark:text-gray-100 font-medium  w-full">
                <td className="w-4 text-center">
                  <p className="bg-gray-900/10 dark:bg-rose-100/10 w-4 h-4"></p>
                </td>
                <td className="flex justify-center items-center h-full">
                  <div className="bg-gray-900/10 dark:bg-white/5 w-20 h-20"></div>
                </td>
                <td className="text-xs md:text-sm md:w-2/6 md:px-4 px-2">
                  <span className="bg-gray-900/10 block dark:bg-rose-100/10 w-32 h-4"></span>
                  <small className="bg-gray-900/10 md:hidden text-center dark:bg-rose-100/10 w-32 h-4"></small>
                </td>
                <td className="hidden md:table-cell md:text-sm">
                  <p className="bg-gray-900/10 dark:bg-rose-100/10 w-32 h-4"></p>
                </td>
              </tr>
              <tr className=" text-gray-900 dark:text-gray-100 font-medium  w-full">
                <td className="w-4 text-center">
                  <p className="bg-rose-100/10 w-4 h-4"></p>
                </td>
                <td className="flex justify-center items-center h-full">
                  <div className="bg-white/5 w-20 h-20"></div>
                </td>
                <td className="text-xs md:text-sm md:w-2/6 md:px-4 px-2">
                  <span className="block bg-rose-100/10 w-32 h-4"></span>
                  <small className="md:hidden text-center bg-rose-100/10 w-32 h-4"></small>
                </td>
                <td className="hidden md:table-cell md:text-sm">
                  <p className="bg-rose-100/10 w-32 h-4"></p>
                </td>
              </tr>
              <tr className=" text-gray-900 dark:text-gray-100 font-medium  w-full">
                <td className="w-4 text-center">
                  <p className="bg-rose-100/10 w-4 h-4"></p>
                </td>
                <td className="flex justify-center items-center h-full">
                  <div className="bg-white/5 w-20 h-20"></div>
                </td>
                <td className="text-xs md:text-sm md:w-2/6 md:px-4 px-2">
                  <span className="block bg-rose-100/10 w-32 h-4"></span>
                  <small className="md:hidden text-center bg-rose-100/10 w-32 h-4"></small>
                </td>
                <td className="hidden md:table-cell md:text-sm">
                  <p className="bg-rose-100/10 w-32 h-4"></p>
                </td>
              </tr>
              <tr className=" text-gray-900 dark:text-gray-100 font-medium  w-full">
                <td className="w-4 text-center">
                  <p className="bg-rose-100/10 w-4 h-4"></p>
                </td>
                <td className="flex justify-center items-center h-full">
                  <div className="bg-white/5 w-20 h-20"></div>
                </td>
                <td className="text-xs md:text-sm md:w-2/6 md:px-4 px-2">
                  <span className="block bg-rose-100/10 w-32 h-4"></span>
                  <small className="md:hidden text-center bg-rose-100/10 w-32 h-4"></small>
                </td>
                <td className="hidden md:table-cell md:text-sm">
                  <p className="bg-rose-100/10 w-32 h-4"></p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TracksLoading;
