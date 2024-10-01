import { useContext } from "react";
import { UserContext } from "../context/AuthContext";
import Keyboard from "./Keyboard";
import NavBar from "./NavBar";

function Home() {
  const { isLoggedOut, user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <h1>Le Keyboard Warrior</h1>

      <br />
      <br />
      {isLoggedOut ? null : <h2>Hello {user?.userName} </h2>}
      <h2>WPM:100 Accuracy: 50%</h2>
      <Keyboard />
    </>
  );
}

export default Home;
