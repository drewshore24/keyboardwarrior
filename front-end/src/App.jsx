import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import Home from "./Component/Home";
import MyProfile from "./Component/MyProfile";
import Login from "./Component/Login";
import Signup from "./Component/SignUp";
import Leaderboard from "./Component/Leaderboard";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/:username" element={<MyProfile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </>
  );
}

export default App;
