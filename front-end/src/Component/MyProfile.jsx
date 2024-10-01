import { useContext } from "react";
import { UserContext } from "../context/AuthContext";
import { logout } from "../utils/auth";
import PlayerStats from "./PlayerStats";

function MyProfile() {
  const { user } = useContext(UserContext);

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <div>
        <h1>Welcome {user?.firstName}</h1>
        <PlayerStats />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
}

export default MyProfile;
