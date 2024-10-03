import { useState, useEffect, useRef } from "react";
import "../WordGame.css";
const paragraph =
  "As the sun dipped below the horizon, the sky transformed into a canvas of vibrant oranges and deep purples, casting a warm glow over the quiet town. The evening breeze carried the sweet scent of blooming jasmine, mingling with the distant sounds of laughter and music from a nearby festival. Streetlights flickered to life, illuminating the cobblestone streets where families strolled leisurely, savoring the moment. In this tranquil setting, time seemed to slow, allowing the beauty of the world to unfold in every detail.";

const WordGame = ({typedLetter, setTypedLetter, isSpecialKey, setSpecialKey}) => {
//   const [typedLetter, setTypedLetter] = useState(null);
  const inputRef = useRef(null);
  const [strArray, setStrArr] = useState([]);
  const [timer, setTimer] = useState(30)
  const [timerStarted, setTimerStarted] = useState(false);
  const [correctChar, setCorrectChar] = useState(0)
  const [cpm, setCpm] = useState(0)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(0)


  useEffect(() => {
    if(timer === 0){
      const charPerMin = Math.ceil(correctChar * 2)
      setCpm(charPerMin)
      const WordsPerMmin = Math.ceil(charPerMin / 5)
      setWpm(WordsPerMmin)
      const accuarcyByPercentage = (correctChar / strArray.length) * 100
      const roundedAccuarcy = accuarcyByPercentage.toFixed(1)
      setAccuracy(roundedAccuarcy)
    }
  }, [timer])


  function handleKeyDown(e) {
    const specialKeys = ["Shift", "CapsLock", "Alt", "Control"];
    const lastTypedCharacter = strArray[strArray.length -1]
    const currentParagraphLetter = paragraph[strArray.length -1]
    if (specialKeys.includes(e.key)) {
        setSpecialKey(e.key)
      return;
    }
    if(timerStarted === false){
      setTimerStarted(true)
    }
    if(typedLetter !== null && lastTypedCharacter === currentParagraphLetter){
      setCorrectChar((correctChar) => correctChar + 1)
    }
    if(typedLetter !== null && lastTypedCharacter !== currentParagraphLetter){
      setCorrectChar((correctChar) => correctChar - 1)
    }
    setTypedLetter(e.key);
    if (e.key === "Backspace") {
      setStrArr((strArray) => strArray.slice(0, -1));
    } else {
      setStrArr((strArray) => [...strArray, e.key]);
    }
  }


  useEffect(() => {
    if (timer > 0 && timerStarted === true) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      
      return () => clearInterval(intervalId); 
    }
  }, [timer, timerStarted]);


  function getClassName(i) {
    if (strArray.length === i) {
      return "active";
    }
    if (strArray.length> i) {
      if (typedLetter !== null && strArray[i] === paragraph[i]) {
        return "correct";
      } else {
        return "incorrect";
      }
    }
  }

  function handleClick() {
    inputRef.current.focus();
  }

  function refresh(){
    setTypedLetter(null)
    setStrArr([])
    setTimer(30)
    setTimerStarted(false)
    setCorrectChar(0)
    setCpm(0)
    setWpm(0)
    setAccuracy(0)
  }

  return (
    <section className="word-game">
      <div className="word-game-container">
        <div className="test" onClick={handleClick}>
          <input
            type="text"
            className="input-field"
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          {paragraph.split("").map((char, i) => {
            return (
              <span className={[`char ${getClassName(i)}`]} key={i}>
                {char}
              </span>
            );
          })}
        </div>
      </div>
      <div className="result">
        <p className="statistics time-r">Time Remaining: {timer} </p>
        <p className="statistics accuracy">Accuracy: {accuracy}%</p>
        <p className="statistics wpm">WPM: {wpm}</p>
        <p className="statistics cpm">CPM: {cpm}</p>
      </div>
      <button className="Refresh" onClick={refresh}>Refresh</button>
    </section>
  );
};

export default WordGame;
