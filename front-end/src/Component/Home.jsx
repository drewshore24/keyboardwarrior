import { useContext, useState } from "react";
import { UserContext } from "../context/AuthContext";
import NavBar from "./NavBar";
import WordGame from "./WordGame";
import Login from "./Login";
import Signup from "./SignUp";

function Home() {
  const { isLoggedOut, user } = useContext(UserContext);
  const [typedLetter, setTypedLetter] = useState(null);
  const [isSpecialKey, setSpecialKey] = useState(null);

  return (
    <>
      <div>
        <NavBar />
      </div>

      <div className="header">
        <h1>Le Keyboard Warrior</h1>
      </div>

      <div className="welcome-message">
        {isLoggedOut ? (
          <Login />
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
        />
      </div>
    </>
  );
}

export default Home;
