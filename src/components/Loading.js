import React from "react";
import styles from "./Loading.module.css";
const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-[#191414]">
      <div className={styles.loading}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
