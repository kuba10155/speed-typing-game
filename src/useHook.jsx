import {useState, useEffect, useRef} from "react"

export default function useHook(startingTime = 10) {

  const inputRef = React.useRef(null)
  const [text, setText] = React.useState("")
  const [timeRemaining, setTimeRemaining] = React.useState(startingTime)
  const [isTimeRunning, setIsTimeRunning] = React.useState(false)
  const [wordCount, setWordCount] = React.useState(0)

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
    const wordsArr = text.trim().split(" ")
    return wordsArr.filter(word => word !== "").length
  }

  function startGame() {
    setText("")
    setTimeRemaining(startingTime)
    setIsTimeRunning(true)
    setWordCount(0)
    inputRef.current.disabled = false
    inputRef.current.focus()
  }

  function endGame() {
    setIsTimeRunning(false)
    setWordCount(calculateWords(text))
  }

  return {text, timeRemaining, isTimeRunning, wordCount, handleChange, startGame, inputRef}
}
