import "./App.css";
import GeneratedResult from "./GeneratedResult/GeneratedResult";
import StoryForm from "./StoryForm/StoryForm";
import storyGeneratorCall from "./StoryGeneratorCall";
import { useEffect, useState } from "react";
import Loader from "./Loader/Loader";
import Intro from "./Intro/Intro";

function App() {
  const [isStoryCreated, setIsStoryCreated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [progress, setProgress] = useState(0);
  const [generatedStory, setGeneratedStory] = useState("");
  const [firstRender, setFirstRender] = useState(true);

  const speedOfGeneration = (length) => {
    switch (length) {
      case "short":
        return 500;
      case "medium":
        return 800;
      case "long":
        return 1100;
      default:
        return 500;
    }
  };

  const simulateProgress = (speed) => {
    const interval = setInterval(() => {
      setProgress((currentProgress) => {
        if (currentProgress >= 90) {
          clearInterval(interval);
          return currentProgress;
        }
        return currentProgress + 10;
      });
    }, speed);

    return interval;
  };

  const handleSubmit = async (formData, length) => {
    const speedOfProgressBar = speedOfGeneration(length);
    setIsStoryCreated(false);
    const interval = simulateProgress(speedOfProgressBar);
    setFirstRender(false);

    try {
      const story = await storyGeneratorCall(formData, length);
      clearInterval(interval);
      setProgress(100);
      setGeneratedStory(story);
      setErrorMsg("");
      setIsStoryCreated(true);
    } catch (error) {
      console.error("Failed to generate story", error);
      clearInterval(interval);
      setErrorMsg("Failed to generate story");
      setIsStoryCreated(false);
    }
  };

  useEffect(() => {
    if (isStoryCreated) {
      const timeout = setTimeout(() => setProgress(0), 500);
      return () => clearTimeout(timeout);
    }
  }, [isStoryCreated]);

  return (
    <div className="container">
      <div className="formContainer">
        <StoryForm onSubmit={handleSubmit} />
      </div>
      <div className="generatedStory">
        {firstRender ? (
          <Intro />
        ) : isStoryCreated ? (
          <GeneratedResult story={generatedStory} />
        ) : (
          <Loader progress={progress} />
        )}
      </div>
    </div>
  );
}

export default App;
