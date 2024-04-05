import React, { useState, useEffect } from "react";
import styles from "./Intro.module.css";

const Intro = () => {
  const [visibleText, setVisibleText] = useState("");
  const [typingFinished, setTypingFinished] = useState(false);
  const [index, setIndex] = useState(0);

  const words =
    `Dive into your own creation: craft tales of neon-lit Neo-Tokyo streets, 
      epic Medieval quests, or unexpected Romantic comedies. Populate your world with 
      characters like valiant princesses, fire-breathing dragons, or even an alter-ego of 
      yourself. Whatever you imagine, bring your story to life here and let us handle the 
      intricacies of narration. Because your vision deserves a narrative as unique as you — 
      we’ll make the magic happen, while you captivate the world!`.split(" ");

  useEffect(() => {
    let timeoutId;
    if (index < words.length) {
      timeoutId = setTimeout(() => {
        setVisibleText(words.slice(0, index + 1).join(" "));
        setIndex(index + 1);
      }, 200);
    } else {
      setTypingFinished(true);
    }
    return () => clearTimeout(timeoutId);
  }, [index, words.length]);

  return (
    <div>
      <h1 className={styles.title}>Story Generator</h1>
      <div className={styles.typewriterContainer}>
        <div className={styles.typewriter}>
          {visibleText}
          {!typingFinished && <span className={styles.cursor}></span>}{" "}
        </div>
      </div>
    </div>
  );
};

export default Intro;
