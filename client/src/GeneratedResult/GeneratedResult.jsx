import React, { useRef, useState, useEffect } from "react";
import styles from "./GeneratedResult.module.css";

const GeneratedResult = ({ story, scrollable }) => {
  const containerRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);
  // const [atBottom, setAtBottom] = useState(false);

  const lines = story.split("\n");
  const title = cleanTitle(lines[0]);
  const bodyText = lines.slice(1).join("\n");

  useEffect(() => {
    const checkScrollability = () => {
      const { current: container } = containerRef;
      // Check if the content height is greater than the container's height
      const scrollable = container.scrollHeight > container.clientHeight;
      setIsScrollable(scrollable);
    };

    checkScrollability();

    // Optional: Re-check scrollability if you expect the container's size to change
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [story]); // Dependency array includes `story` to re-check when story changes

  return (
    <div
      ref={containerRef}
      className={`${styles.generatedStory} ${
        isScrollable ? styles.scrollable : ""
      }`}
    >
      <h1 className={styles.storyTitle}>{title}</h1>
      <div className={styles.storyText}>{bodyText}</div>
      {scrollable && <div className={styles.scrollIndicator}>↓</div>}
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
