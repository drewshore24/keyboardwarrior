import { useContext, useState } from "react";
import { UserContext } from "../context/AuthContext";
import { logout } from "../utils/auth";
import PlayerStats from "./PlayerStats";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import ProfileCard from "./profile/ProfileCard";
import ProfileImage from "./profile/ProfileImage";
import UpdateProfile from "./profile/UpdateProfile";
import "../css/MyProfile.css";

function MyProfile() {
  const { user } = useContext(UserContext);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
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
      
      <div className="profile-container">
        <h1 className="welcome-message">Welcome {user?.userName}</h1>
        <div className="profile-image-container">
          <ProfileImage user={user} />
        </div>

        <div className="profile-content">
          <div className="profile-card-container">
            <ProfileCard user={user} />
            <button
              className="edit-profile-button"
              onClick={() => {
                setShowUpdateModal(true);
              }}
            >
              Edit Profile
            </button>
            <UpdateProfile
              setShowUpdateModal={setShowUpdateModal}
              showUpdateModal={showUpdateModal}
            />
          </div>

          <div className="player-stats-container">
            <PlayerStats />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
