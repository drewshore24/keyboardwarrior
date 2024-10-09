import "../../src/css/leaderboard.css";
import Loading from "./Loading";
import { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { UserContext } from "../context/AuthContext";
import { logout } from "../utils/auth";
import { listenToUsersCollection } from "../utils/crud";

function Leaderboard() {
  const { isLoggedOut, user } = useContext(UserContext);

  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    listenToUsersCollection("users", setLeaderboard);
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (isLoading === true) {
    return <Loading />;
  }

  return (
    <>
      {isLoggedOut ? (
        <Nav>
          <Link className="home-button" to="/">
            Home
          </Link>
        </Nav>
      ) : (
        <div className="nav-bar">
          <Nav>
            <Link className="logout-button" to="/" onClick={handleLogout}>
              Logout
            </Link>
            <Link className="leaderboard-button" to="/leaderboard">
              Leaderboard
            </Link>
            <Link className="home-button" to="/">
              Home
            </Link>
          </Nav>
        </div>
      )}
      <div className="table-container">
        <h1 className="leaderboard-header">Leaderboard</h1>
        <br />
        <table
          className="scoreboard"
          border="1"
          cellPadding="10"
          cellSpacing="0"
        >
          <thead>
            <tr>
              <th className="title">username</th>
              <th className="title">Location</th>
              <th className="title">Highest Score</th>
              <th className="title">Average WPM</th>
              <th className="title">Average accuracy</th>
              <th className="title">Games Played</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((val, i) => (
              <tr key={i}>
                <td className="table-body">{val?.userName}</td>
                <td className="table-body">{val?.location}</td>
                <td className="table-body">{val?.highScore}</td>
                <td className="table-body">{val?.averageWpm}</td>
                <td className="table-body">{val?.averageAccuracy}</td>
                <td className="table-body">{val?.gamesPlayed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Leaderboard;
