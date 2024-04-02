import React from 'react';
import styles from './Loader.module.css'; // Ensure the path matches where your CSS file is located

const Loader = ({ progress }) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingBar}>
        <div className={styles.progress} style={{ width: `${progress}%` }}></div>
      </div>
      <div className={styles.loadingText}>{`Generating... ${progress}%`}</div>
    </div>
  );
};

export default Loader;
