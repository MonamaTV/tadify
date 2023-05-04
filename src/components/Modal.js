import Image from "next/image";

const Modal = ({ children, downloadStats, closeModal }) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 dark:bg-background bg-white flex flex-col-reverse justify-center py-10 gap-10 md:flex-row z-40 overflow-auto pb-24">
      {children}
      <div className="text-gray-900 dark:text-white flex  flex-col px-10 md:p-10 ">
        <button
          onClick={closeModal}
          className="border-none bg-none absolute md:top-20 md:right-36 right-10"
        >
          <Image
            src={"/closes.png"}
            width={20}
            height={20}
            alt="close button"
          />
        </button>
        <h2 className="text-3xl font-bold"> Stats</h2>

        <button
          onClick={downloadStats}
          className="bg-primary px-10 py-2  my-3 disabled:bg-[#858a87] disabled:cursor-not-allowed text-white"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Modal;
