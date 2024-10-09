import { Link } from "react-router-dom";
import { UserContext } from "../context/AuthContext";
import { useContext } from "react";
import { logout } from "../utils/auth";
import Nav from "./Nav";

const NavBar = () => {
  const { isLoggedOut, setShowModal, user } = useContext(UserContext);

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      {isLoggedOut ? (
        <Nav>
          <Link className="link" to="/login" onClick={() => setShowModal(true)}>
            Login
          </Link>
          <Link className="link" to="/leaderboard">
            Leaderboard
          </Link>
        </Nav>
      ) : (
        <Nav>
          <Link className="link" onClick={handleLogout}>
            Logout
          </Link>
          <Link className="link" to="/leaderboard">
            Leaderboard
          </Link>
          <Link className="link" to={`/profile/${user?.userName}`}>
            Profile
          </Link>
        </Nav>
      )}
    </>
  );
};

export default NavBar;
