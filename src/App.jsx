import React from "react"
import useHook from "/src/useHook"

export default function App() {
  const {text, timeRemaining, isTimeRunning, wordCount, handleChange, startGame, inputRef} = useHook()

  return (
    <div>
      <h1>Speed Typing Game</h1>
      <textarea ref={inputRef} disabled={!isTimeRunning} value={text} placeholder="Type here..." onChange={handleChange}/>
      <h4>Time remaining: {timeRemaining}</h4>
      <button disabled={isTimeRunning} onClick={startGame}>Start</button>
      <h1>Word count: {wordCount}</h1>
    </div>
  )
}
