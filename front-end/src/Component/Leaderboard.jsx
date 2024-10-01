import "../../src/leaderboard.css";
import Loading from "./Loading";
import { useState } from "react";
function Leaderboard() {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading === true) {
    return <Loading />;
  }
  return (
    <>
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
              <th className="title">WPM</th>
              <th className="title">score</th>
              <th className="title">accuracy</th>
              <th className="title">practice time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="table-body">John Doe</td>
              <td className="table-body">126.34</td>
              <td className="table-body">3000</td>
              <td className="table-body">98.43%</td>
              <td className="table-body">47:38 hours</td>
            </tr>
            <tr>
              <td className="table-body">Ken Adams</td>
              <td className="table-body">122.34</td>
              <td className="table-body">2910</td>
              <td className="table-body">98.43%</td>
              <td className="table-body">42:38 hours</td>
            </tr>
            <tr>
              <td className="table-body">Ken Adams</td>
              <td className="table-body">122.34</td>
              <td className="table-body">2910</td>
              <td className="table-body">98.43%</td>
              <td className="table-body">42:38 hours</td>
            </tr>
            <tr>
              <td className="table-body">Ken Adams</td>
              <td className="table-body">122.34</td>
              <td className="table-body">2910</td>
              <td className="table-body">98.43%</td>
              <td className="table-body">42:38 hours</td>
            </tr>
            <tr>
              <td className="table-body">Ken Adams</td>
              <td className="table-body">122.34</td>
              <td className="table-body">2910</td>
              <td className="table-body">98.43%</td>
              <td className="table-body">42:38 hours</td>
            </tr>
            <tr>
              <td className="table-body">Ken Adams</td>
              <td className="table-body">122.34</td>
              <td className="table-body">2910</td>
              <td className="table-body">98.43%</td>
              <td className="table-body">42:38 hours</td>
            </tr>
            <tr>
              <td className="table-body">Ken Adams</td>
              <td className="table-body">122.34</td>
              <td className="table-body">2910</td>
              <td className="table-body">98.43%</td>
              <td className="table-body">42:38 hours</td>
            </tr>
            <tr>
              <td className="table-body">Ken Adams</td>
              <td className="table-body">122.34</td>
              <td className="table-body">2910</td>
              <td className="table-body">98.43%</td>
              <td className="table-body">42:38 hours</td>
            </tr>
            <tr>
              <td className="table-body">Ken Adams</td>
              <td className="table-body">122.34</td>
              <td className="table-body">2910</td>
              <td className="table-body">98.43%</td>
              <td className="table-body">42:38 hours</td>
            </tr>
            <tr>
              <td className="table-body">Ken Adams</td>
              <td className="table-body">122.34</td>
              <td className="table-body">2910</td>
              <td className="table-body">98.43%</td>
              <td className="table-body">42:38 hours</td>
            </tr>
            <tr>
              <td className="table-body">Ken Adams</td>
              <td className="table-body">122.34</td>
              <td className="table-body">2910</td>
              <td className="table-body">98.43%</td>
              <td className="table-body">42:38 hours</td>
            </tr>
            <tr>
              <td className="table-body">Ken Adams</td>
              <td className="table-body">122.34</td>
              <td className="table-body">2910</td>
              <td className="table-body">98.43%</td>
              <td className="table-body">42:38 hours</td>
            </tr>
            <tr>
              <td className="table-body">Ken Adams</td>
              <td className="table-body">122.34</td>
              <td className="table-body">2910</td>
              <td className="table-body">98.43%</td>
              <td className="table-body">42:38 hours</td>
            </tr>
            <tr>
              <td className="table-body">Ken Adams</td>
              <td className="table-body">122.34</td>
              <td className="table-body">2910</td>
              <td className="table-body">98.43%</td>
              <td className="table-body">42:38 hours</td>
            </tr>
            <tr>
              <td className="table-body">Ken Adams</td>
              <td className="table-body">122.34</td>
              <td className="table-body">2910</td>
              <td className="table-body">98.43%</td>
              <td className="table-body">42:38 hours</td>
            </tr>
            <tr>
              <td className="table-body">Ken Adams</td>
              <td className="table-body">122.34</td>
              <td className="table-body">2910</td>
              <td className="table-body">98.43%</td>
              <td className="table-body">42:38 hours</td>
            </tr>
            <tr>
              <td className="table-body">Ken Adams</td>
              <td className="table-body">122.34</td>
              <td className="table-body">2910</td>
              <td className="table-body">98.43%</td>
              <td className="table-body">42:38 hours</td>
            </tr>
            <tr>
              <td className="table-body">Ken Adams</td>
              <td className="table-body">122.34</td>
              <td className="table-body">2910</td>
              <td className="table-body">98.43%</td>
              <td className="table-body">42:38 hours</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Leaderboard;
