import React, { useState, useEffect, useRef } from "react";

const STARTING_TIME = 10;

const useHook = (startingTime = STARTING_TIME) => {
  const inputRef = useRef(null);
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(startingTime);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const calculateWords = (text) => {
    const wordsArr = text.trim().split(/\s+/); // trim deletes whitespaces before and after
    return wordsArr.filter((word) => word !== "").length;
  };

  const startGame = () => {
    setText("");
    setTimeRemaining(startingTime);
    setIsTimeRunning(true);
    setWordCount(0);
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const endGame = () => {
    setIsTimeRunning(false);
    setWordCount(calculateWords(text));
  };

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining, isTimeRunning]);

  return {
    text,
    timeRemaining,
    isTimeRunning,
    wordCount,
    handleChange,
    startGame,
    inputRef,
  };
};

export default useHook;
