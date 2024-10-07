import "../../src/css/leaderboard.css";
import Loading from "./Loading";
import { useState } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";

function Leaderboard() {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading === true) {
    return <Loading />;
  }

  return (
    <>
      <Nav>
        <Link
          className="bg-gradient-to-r from-[#FADFA1] to-[#7EACB5] text-white font-bold py-2 px-4 rounded my-4 mx-1"
          to="/"
        >
          Home
        </Link>
      </Nav>
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
            <tr>
              <td className="table-body">John Doe</td>
              <td className="table-body">UK</td>
              <td className="table-body">60</td>
              <td className="table-body">50</td>
              <td className="table-body">98.43%</td>
              <td className="table-body">3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Leaderboard;
