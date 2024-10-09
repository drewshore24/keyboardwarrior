import { useState, useEffect, useRef, useContext } from "react";
import "../css/WordGame.css";
import { UserContext } from "../context/AuthContext";
import {
  getAverage,
  highScoreCalc,
  noOfGames,
  shuffle,
  updateLastTen,
} from "../utils/otherUtils";
import { db } from "../firebase/fire";
import { doc, updateDoc } from "firebase/firestore";
import Keyboard from "./Keyboard";
import click from "../sounds/single-key.wav";
import errorSound from "../sounds/error-sound.mp3";
import { readData } from "../utils/crud";

const defaultText =
  "As the sun dipped below the horizon, the sky transformed into a canvas of vibrant oranges and deep purples, casting a warm glow over the quiet town. The evening breeze carried the sweet scent of blooming jasmine, mingling with the distant sounds of laughter and music from a nearby festival. Streetlights flickered to life, illuminating the cobblestone streets where families strolled leisurely, savoring the moment. In this tranquil setting, time seemed to slow, allowing the beauty of the world to unfold in every detail.";

const WordGame = ({ typedLetter, setTypedLetter, soundOn }) => {
  const { user, stats } = useContext(UserContext);
  const inputRef = useRef(null);
  const [strArray, setStrArr] = useState([]);
  const [timer, setTimer] = useState(30);
  const [timerStarted, setTimerStarted] = useState(false);
  const [correctChar, setCorrectChar] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isTime0, setIsTime0] = useState(false);
  const [paragraph, SetParagraph] = useState(defaultText);
  const [text, setText] = useState(defaultText);
  const [specialKey, setSpecialKey] = useState(null);

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

  function handleKeyDown(e) {
    const specialKeys = ["Shift", "CapsLock", "Alt", "Control"];
    const lastTypedCharacter = strArray[strArray.length - 1];
    const currentParagraphLetter = paragraph[strArray.length - 1];
    const typedLetter = paragraph[strArray.length];
    const keySound = new Audio(click);
    const wrongKey = new Audio(errorSound);

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
    if(soundOn){
    if (typedLetter === e.key) {
      keySound.play();
    } else {
      wrongKey.play();
    }
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
    if (strArray.length > i) {
      if (typedLetter !== null && strArray[i] === paragraph[i]) {
        return "correct";
      } else {
        return "incorrect";
      }
    }
  }

  function handleClick() {
    if (!gameStarted) {
      setGameStarted(true);
    }
    inputRef.current.focus();
  }

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
      return (
        <>
          <div className="stats-in-text-box">
            <p>Time's up! Here are your stats:</p>
            <p>WPM: {wpm}</p>
            <p>Accuracy: {accuracy}%</p>
            <p>CPM: {cpm}</p>
          </div>
        </>
      );
    }
  }

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

  useEffect(() => {
    const id = user?.uid;
    if (user && isTime0) {
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

  useEffect(() => {
    const easy = [];
    const medium = [];
    const hard = [];
    readData("Words", "UbEpCK8nX6NnQKg0ubYP").then((data) => {
      for (let i = 1; i < 4; i++) {
        easy.push(data[`easy${i}`]);
        medium.push(data[`medium${i}`]);
        hard.push(data[`hard${i}`]);
      }
      setText({
        easy,
        medium,
        hard,
      });
    });
  }, []);

  function ParagraphGen(selection) {
    const easy = shuffle(text["easy"]);
    const medium = shuffle(text["medium"]);
    const hard = shuffle(text["hard"]);
    const difficulty = selection.target.value;
    if (difficulty === "easy") {
      console.log();
      SetParagraph(easy[0]);
    }
    if (difficulty === "medium") {
      SetParagraph(medium[0]);
    }
    if (difficulty === "hard") {
      SetParagraph(hard[0]);
    }
  }

  return (
    <section className="word-game">
      <div className="controls-container">
        <select className="DropDown" onChange={ParagraphGen}>
          <option className="selection" value="easy">
            Easy
          </option>
          <option className="selection" value="medium">
            Medium
          </option>
          <option className="selection" value="hard">
            Hard
          </option>
        </select>

          <p className="statistics time-r">
            <span>{timer}</span>
            <div
              className="timer-bar"
              style={{ width: `${(timer / 30) * 100}%` }}
            />
          </p>

        <button className="Refresh" onClick={refresh}>
          Play Again!
        </button>
      </div>

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

      <Keyboard typedLetter={typedLetter} isSpecialKey={specialKey} />
    </section>
  );
};

export default WordGame;
