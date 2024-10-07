import "../../src/css/leaderboard.css";
import Loading from "./Loading";
import { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { UserContext } from "../context/AuthContext";
import { query, orderBy, limit, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/fire";
import { logout } from "../utils/auth";

function Leaderboard() {
  const { isLoggedOut, user } = useContext(UserContext);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    const usersData = [];
    const usersRef = collection(db, "users");
    const usersQuery = query(usersRef, orderBy("highScore", "desc"), limit(10));
    try {
      const querySnapshot = await getDocs(usersQuery);

      querySnapshot.forEach((doc) => {
        usersData.push(doc.data());
      });
      setLeaderboard(usersData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
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
          <Link
            className="bg-gradient-to-r from-[#FADFA1] to-[#7EACB5] text-white font-bold py-2 px-4 rounded my-4 mx-1"
            to="/"
          >
            Home
          </Link>
        </Nav>
      ) : (
        <Nav>
          <Link
            className="bg-gradient-to-r from-[#FADFA1] to-[#7EACB5] text-white font-bold py-2 px-4 rounded my-4 mx-1"
            to="/"
          >
            Home
          </Link>
          <Link
            className="bg-gradient-to-r from-[#FADFA1] to-[#7EACB5] text-white font-bold py-2 px-4 rounded my-4 mx-1"
            to={`/profile/${user?.userName}`}
          >
            Profile
          </Link>
          <Link
            className="bg-gradient-to-r from-[#7EACB5] to-[#C96868] text-white font-bold py-2 px-4 rounded my-4 mx-1"
            to="/"
            onClick={handleLogout}
          >
            Logout
          </Link>
        </Nav>
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
