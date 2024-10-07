import { useState, useEffect, useRef, useContext } from "react";
import "../css/WordGame.css";

import { UserContext } from "../context/AuthContext";
import {
  getAverage,
  highScoreCalc,
  noOfGames,
  updateLastTen,
} from "../utils/otherUtils";
import { db } from "../firebase/fire";
import { doc, updateDoc } from "firebase/firestore";
const paragraph =
  "As the sun dipped below the horizon, the sky transformed into a canvas of vibrant oranges and deep purples, casting a warm glow over the quiet town. The evening breeze carried the sweet scent of blooming jasmine, mingling with the distant sounds of laughter and music from a nearby festival. Streetlights flickered to life, illuminating the cobblestone streets where families strolled leisurely, savoring the moment. In this tranquil setting, time seemed to slow, allowing the beauty of the world to unfold in every detail.";

const WordGame = ({ typedLetter, setTypedLetter, setSpecialKey }) => {
  // useStates
  const { user, stats } = useContext(UserContext);
  const inputRef = useRef(null);
  const [strArray, setStrArr] = useState([]);
  const [timer, setTimer] = useState(10);
  const [timerStarted, setTimerStarted] = useState(false);
  const [correctChar, setCorrectChar] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isTime0, setIsTime0] = useState(false);

  // stats calculations
  useEffect(() => {
    if (timer === 0) {
      const charPerMin = Math.ceil(correctChar * 2);
      setCpm(charPerMin);
      const WordsPerMmin = Math.ceil(charPerMin / 5);
      setWpm(WordsPerMmin);
      const accuarcyByPercentage = (correctChar / strArray.length) * 100;
      const roundedAccuarcy = accuarcyByPercentage.toFixed(1);
      setAccuracy(roundedAccuarcy);
      setIsTime0(true);
    }
  }, [timer]);

  // keyboard and game functionality
  function handleKeyDown(e) {
    const specialKeys = ["Shift", "CapsLock", "Alt", "Control"];
    const lastTypedCharacter = strArray[strArray.length - 1];
    const currentParagraphLetter = paragraph[strArray.length - 1];
    if (specialKeys.includes(e.key)) {
      setSpecialKey(e.key);
      return;
    }
    if (timerStarted === false) {
      setTimerStarted(true);
    }
    if (typedLetter !== null && lastTypedCharacter === currentParagraphLetter) {
      setCorrectChar((correctChar) => correctChar + 1);
    }
    if (typedLetter !== null && lastTypedCharacter !== currentParagraphLetter) {
      setCorrectChar((correctChar) => correctChar - 1);
    }
    setTypedLetter(e.key);
    if (e.key === "Backspace") {
      setStrArr((strArray) => strArray.slice(0, -1));
    } else {
      setStrArr((strArray) => [...strArray, e.key]);
    }
  }

  // timer logic
  useEffect(() => {
    if (timer > 0 && timerStarted === true) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timer, timerStarted]);

  // working out current letter and correct letters
  function getClassName(i) {
    if (strArray.length === i) {
      return "active";
    }
    if (strArray.length > i) {
      if (typedLetter !== null && strArray[i] === paragraph[i]) {
        return "correct";
      } else {
        return "incorrect";
      }
    }
  }

  // deals with user clicking on game
  function handleClick() {
    if (!gameStarted) {
      setGameStarted(true);
    }
    inputRef.current.focus();
  }

  // changes screen depending on state
  function conditionalRender() {
    if (gameStarted && timer > 0) {
      return paragraph.split("").map((char, i) => (
        <span className={`char ${getClassName(i)}`} key={i}>
          {char}
        </span>
      ));
    }
    if (!gameStarted && timer > 0) {
      return (
        <span className="start-game-text">
          Please click here to start the game. Once you start typing, the timer
          will start...
        </span>
      );
    }
    if (gameStarted && timer === 0) {
      return <p className="stats-return">Stats</p>;
    }
  }

  // handles refresh button and returns all state to default
  function refresh() {
    setTypedLetter(null);
    setStrArr([]);
    setTimer(30);
    setTimerStarted(false);
    setCorrectChar(0);
    setCpm(0);
    setWpm(0);
    setAccuracy(0);
    setGameStarted(false);
    setIsTime0(false);
  }

  // sets the data for the database (backend)
  const userData = {
    gamesPlayed: 0,
    highScore: 0,
    lastTenWpm: [],
    lastTenAccuracy: [],
    averageWpm: 0,
    averageAccuracy: 0,
    accuracy: 0,
    wpm: 0,
    cpm: 0,
  };

  // calls functions to calculate backend data and sends the data.
  useEffect(() => {
    const id = user?.uid;
    if (isTime0) {
      const lastTen_wpm = updateLastTen(stats?.lastTenWpm, wpm);
      const lastTen_accuracy = updateLastTen(stats?.lastTenAccuracy, accuracy);
      const avg_wpm = getAverage(stats?.lastTenWpm);
      const avg_accuracy = getAverage(stats?.lastTenAccuracy);
      const high_score = highScoreCalc(wpm, stats?.highScore);
      const games = noOfGames(stats?.gamesPlayed);

      userData.gamesPlayed = games;
      userData.highScore = high_score;
      userData.lastTenWpm = lastTen_wpm;
      userData.lastTenAccuracy = lastTen_accuracy;
      userData.averageWpm = avg_wpm;
      userData.averageAccuracy = avg_accuracy;
      userData.accuracy = Number(accuracy).toFixed(2);
      userData.wpm = wpm;
      userData.cpm = cpm;
    }
    if (user && wpm > 0) {
      const docRef = doc(db, "gameStats", id);
      updateDoc(docRef, {
        id,
        ...userData,
      }).then(() => {
        console.log("data");
      });
    }
  }, [wpm]);

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
          <div className="text-field">{conditionalRender()}</div>
        </div>
      </div>
      <div className="result">
        <p className="statistics time-r">Time Remaining: {timer} </p>
        <p className="statistics accuracy">Accuracy: {accuracy}%</p>
        <p className="statistics wpm">WPM: {wpm}</p>
        <p className="statistics cpm">CPM: {cpm}</p>
      </div>
      <button className="Refresh" onClick={refresh}>
        Refresh
      </button>
    </section>
  );
};

export default WordGame;
