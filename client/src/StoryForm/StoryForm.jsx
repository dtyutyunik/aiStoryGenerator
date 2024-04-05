import React, { useState } from "react";
import styles from "./StoryForm.module.css";

const StoryForm = ({ onSubmit }) => {
  const options = [
    { value: "short", label: "short" },
    { value: "medium", label: "medium" },
    { value: "long", label: "long" },
  ];

  const [formData, setFormData] = useState({
    genre: "",
    characters: "",
    setting: "",
    plotPoints: "",
    length: "short",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const autoGrow = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const prompt = `Create a story with the following: the genre is a ${formData.genre} about ${formData.characters} in ${formData.setting}, where ${formData.plotPoints}`;
    onSubmit(prompt, formData.length);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <div>
            <label className={styles.label}>Character(s):</label>
          </div>
          <textarea
            className={styles.textareaField}
            name="characters"
            value={formData.characters}
            onChange={handleChange}
            onInput={autoGrow}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <div>
            <label className={styles.label}>Setting:</label>
          </div>
          <textarea
            className={styles.textareaField}
            name="setting"
            value={formData.setting}
            onChange={handleChange}
            onInput={autoGrow}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <div>
            <label className={styles.label}>Genre:</label>
          </div>
          <input
            className={styles.inputField}
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <div>
            <label className={styles.label}>Plot Points:</label>
          </div>
          <textarea
            className={styles.textareaField}
            name="plotPoints"
            value={formData.plotPoints}
            onChange={handleChange}
            onInput={autoGrow}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <div>
            <label className={styles.label}>Choose Story Length:</label>
          </div>
          <select
            className={styles.selectField}
            name="length"
            value={formData.length}
            onChange={handleChange}
            required
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.buttonDiv}>
          <button className={styles.submitButton} type="submit">
            Generate Story
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoryForm;
