import { useContext, useState } from "react";
import { UserContext } from "../context/AuthContext";
import "../css/Home.css";
import NavBar from "./NavBar";
import WordGame from "./WordGame";
import ToggleSound from "./ToggleSound";

function Home() {
  const { isLoggedOut, user } = useContext(UserContext);
  const [typedLetter, setTypedLetter] = useState(null);
  const [isSpecialKey, setSpecialKey] = useState(null);
  const [soundOn, setSoundOn] = useState(false)

  return (
    <div className="Home-Page">
      <div className="top-bar">
        <NavBar />
        <div className="sound-button">
        <ToggleSound
        soundOn={soundOn}
        setSoundOn={setSoundOn}
        />
        </div>
      </div>
      <div className="header">
        <h1>Le Keyboard Warrior</h1>
      </div>

      <div className="welcome-message">
        {isLoggedOut ? (
          null
        ) : (
          <p
            style={{
              fontFamily: '"Cedarville Cursive", cursive',
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "35px",
            }}
          >
            Welcome {user?.userName}{" "}
          </p>
        )}
      </div>

      <div className="Game-Keyboard-Container">
        <WordGame
          typedLetter={typedLetter}
          setTypedLetter={setTypedLetter}
          isSpecialKey={isSpecialKey}
          setSpecialKey={setSpecialKey}
          soundOn={soundOn}
        />
      </div>
    </div>
  );
}

export default Home;
