import React, { useRef, useState, useEffect } from "react";
import styles from "./GeneratedResult.module.css";

const GeneratedResult = ({ story }) => {
  const containerRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const lines = story.split("\n");
  const title = cleanTitle(lines[0]);
  const bodyText = lines.slice(1).join("\n");

  useEffect(() => {
    const checkScrollability = () => {
      const clientHeight = containerRef?.current?.clientHeight;

      const scrollable = clientHeight > 699;

      setIsScrollable(scrollable);
    };

    checkScrollability();

    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [story]);

  return (
    <div
      ref={containerRef}
      className={`${styles.generatedStory} ${
        isScrollable ? styles.showMoreLine : ""
      }`}
    >
      <h1 className={styles.storyTitle}>{title}</h1>
      <div className={styles.storyText}>{bodyText}</div>
      {isScrollable && <div className={styles.scrollIndicator}>↓</div>}
    </div>
  );
};

export default GeneratedResult;

const cleanTitle = (title) => {
  let cleanedTitle = title.trim();

  if (
    (cleanedTitle.startsWith('"') && cleanedTitle.endsWith('"')) ||
    (cleanedTitle.startsWith("'") && cleanedTitle.endsWith("'"))
  ) {
    cleanedTitle = cleanedTitle.substring(1, cleanedTitle.length - 1);
  }

  cleanedTitle = cleanedTitle.replace(/^title:\s*/i, "").trim();

  return cleanedTitle;
};
