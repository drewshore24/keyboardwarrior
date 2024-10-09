import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/AuthContext";
import { readData, updateData } from "../utils/crud";
import '../css/PlayerStats.css'

const PlayerStats = () => {
  const { user } = useContext(UserContext);
  const [stats, setStats] = useState("");

  useEffect(() => {
    if (user?.uid !== undefined) {
      readData("gameStats", user?.uid).then((res) => {
        setStats(res);
      });
    }
  }, [user]);

  const userData = {
    gamesPlayed: stats?.gamesPlayed,
    highScore: stats?.highScore,
    averageAccuracy: stats?.averageAccuracy,
    averageWpm: stats.averageWpm,
  };

  useEffect(() => {
    if (userData.highScore !== undefined) {
      updateData("users", user?.uid, userData);
    }
  }, [stats]);

  return (
    <div className="player-stats-card">

      <div className="header">
        <h3 className="stats-header">{user?.userName}'s Stats</h3>
      </div>

      <div className="content">

        <dl className="stats-details">
          <div className="stat">
            <dt>Games played</dt>
            <dd>{stats?.gamesPlayed}</dd>
          </div>

          <div className="stat">
            <dt>Highest Score</dt>
            <dd>{stats?.highScore}</dd>
          </div>

          <div className="stat">
            <dt>Words Per Minute (latest game)</dt>
            <dd>{stats?.wpm}</dd>
          </div>

          <div className="stat">
            <dt>Characters Per Minute (latest game)</dt>
            <dd>{stats?.cpm}</dd>
          </div>

          <div className="stat">
            <dt>Accuracy (latest game)</dt>
            <dd>{stats?.accuracy}%</dd>
          </div>

          <div className="stat">
            <dt>Average Accuracy (last ten games)</dt>
            <dd>{stats?.averageAccuracy}%</dd>
          </div>

          <div className="stat">
            <dt>Average Words Per Minute (last ten games)</dt>
            <dd>{stats?.averageWpm}</dd>
          </div>
          
        </dl>
      </div>
    </div>
  );
};

export default PlayerStats;
