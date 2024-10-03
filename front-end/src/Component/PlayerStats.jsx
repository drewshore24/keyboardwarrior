import { useState } from "react";
import { auth, db } from "../firebase/fire";
import { collection, doc, setDoc } from "firebase/firestore";
import { UserContext } from "../context/AuthContext";
import { useContext } from "react";

const PlayerStats = () => {
  const { user } = useContext(UserContext);
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    highScore: 0,
    previousScores: [],
    accuracy: 9,
    latestScore: 0,
    speed: 0,
  });

  const handleSaveStats = async () => {
    if (user) {
      const uid = user.uid;

      try {
        // Reference to the playerStats collection, with the document ID set to uid
        const statsRef = doc(db, `playerStats/${uid}`);

        // Store the stats with the user UID as the foreign key
        await setDoc(statsRef, {
          gamesPlayed: stats.gamesPlayed,
          highScore: stats.highScore,
          previousScores: stats.previousScores,
          accuracy: stats.accuracy,
          latestScore: stats.latestScore,
          speed: stats.speed,
        });

        console.log("Player stats saved successfully!");
      } catch (error) {
        console.error("Error saving stats: ", error);
      }
    } else {
      console.log("No user is logged in.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Player Stats</h2>
      <input
        type="number"
        placeholder="Games Played"
        value={stats.gamesPlayed}
        onChange={(e) => setStats({ ...stats, gamesPlayed: e.target.value })}
        className="border rounded-lg p-2 mb-4 w-full"
      />
      <input
        type="number"
        placeholder="High Score"
        value={stats.highScore}
        onChange={(e) => setStats({ ...stats, highScore: e.target.value })}
        className="border rounded-lg p-2 mb-4 w-full"
      />
      <input
        type="number"
        placeholder="Level"
        value={stats.level}
        onChange={(e) => setStats({ ...stats, level: e.target.value })}
        className="border rounded-lg p-2 mb-4 w-full"
      />
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        onClick={handleSaveStats}
      >
        Save Stats
      </button>
    </div>
  );
};

export default PlayerStats;
