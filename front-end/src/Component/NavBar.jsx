import { Link } from "react-router-dom";
import { UserContext } from "../context/AuthContext";
import { useContext } from "react";
import { logout } from "../utils/auth";

const NavBar = () => {
  const { isLoggedOut, setShowModal } = useContext(UserContext);

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      {isLoggedOut ? (
        <nav>
          <Link className="link" to="/login" onClick={() => setShowModal(true)}>
            Login
          </Link>
          <Link className="link" to="/leaderboard">
            Leaderboard
          </Link>
          <Link className="link" to="/statistics">
            Statistics
          </Link>
        </nav>
      ) : (
        <nav>
          <Link className="link" onClick={handleLogout}>
            Logout
          </Link>
          <Link className="link" to="/leaderboard">
            Leaderboard
          </Link>
          <Link className="link" to="/profile">
            Profile
          </Link>
        </nav>
      )}
    </>
  );
};

export default NavBar;
