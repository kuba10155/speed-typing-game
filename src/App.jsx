import React from "react"

export default function App() {

  const STARTING_TIME = 5

  const [text, setText] = React.useState("")
  const [timeRemaining, setTimeRemaining] = React.useState(STARTING_TIME)
  const [isTimeRunning, setIsTimeRunning] = React.useState(false)
  const [wordCount, setWordCount] = React.useState(0)

  const inputRef = React.useRef(null)

  function handleChange(event) {
    setText(event.target.value)
  }

  React.useEffect(() => {
    if(isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
          setTimeRemaining(prevTime => prevTime - 1)
      }, 1000)
    } else if(timeRemaining === 0 ) {
        endGame()
    }
  }, [timeRemaining, isTimeRunning])

  function calculateWords(text) {
    const wordsArr = text.trim().split(" ") // trim usuwa białe spacje przed i za słowem
    return wordsArr.filter(word => word !== "").length
  }

  function startGame() {
    setText("")
    setTimeRemaining(STARTING_TIME)
    setIsTimeRunning(true)
    setWordCount(0)
    inputRef.current.disabled = false
    inputRef.current.focus()
  }

  function endGame() {
    setIsTimeRunning(false)
    setWordCount(calculateWords(text))
  }

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
