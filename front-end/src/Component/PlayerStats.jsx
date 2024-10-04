import { useState, useEffect } from "react";
import { UserContext } from "../context/AuthContext";
import { useContext } from "react";

import { readData, updateData } from "../utils/crud";

const PlayerStats = () => {
  const { user } = useContext(UserContext);
  const [stats, setStats] = useState("");

  useEffect(() => {
    readData("gameStats", user?.uid).then((res) => {
      setStats(res);
    });
  }, []);

  const userData = {
    gamesPlayed: stats?.gamesPlayed,
    highScore: stats?.highScore,
  };

  useEffect(() => {
    updateData("users", user?.uid, userData);
  }, [stats]);

  return (
    <div className=" overflow-hidden shadow rounded-lg border border-[#C96868]">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {user?.userName}'s Stats
        </h3>
      </div>
      <div className="border-t border-[#C96868] px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-[#C96868]">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Games played</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {stats?.gamesPlayed}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Highest Score</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {stats?.highScore}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default PlayerStats;
