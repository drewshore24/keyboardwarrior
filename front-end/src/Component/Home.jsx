import { useContext, useState } from "react";
import { UserContext } from "../context/AuthContext";
import NavBar from "./NavBar";
import WordGame from "./WordGame";

function Home() {
  const { isLoggedOut, user } = useContext(UserContext);
  const [typedLetter, setTypedLetter] = useState(null);
  const [isSpecialKey, setSpecialKey] = useState(null)

  return (
    <>
    <div><NavBar /></div>
      <h1>Le Keyboard Warrior</h1>
      {isLoggedOut ? null : <h2>Hello {user?.userName} </h2>}
      <div className="Game-Keyboard-Container">
      <WordGame typedLetter={typedLetter} setTypedLetter={setTypedLetter} isSpecialKey={isSpecialKey} setSpecialKey={setSpecialKey}/>
      </div>
    </>
  );
}

export default Home;
