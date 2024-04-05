import React from "react";
import styles from "./Loader.module.css";

const Loader = ({ progress }) => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loadingBar}>
        <div
          className={styles.progress}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className={styles.loadingText}>{`Generating... ${progress}%`}</div>
    </div>
  );
};

export default Loader;
