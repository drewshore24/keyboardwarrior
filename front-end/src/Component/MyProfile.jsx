import { useContext, useState } from "react";
import { UserContext } from "../context/AuthContext";
import { logout } from "../utils/auth";
import PlayerStats from "./PlayerStats";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import ProfileCard from "./profile/ProfileCard";
import ProfileImage from "./profile/ProfileImage";
import UpdateProfile from "./profile/UpdateProfile";

function MyProfile() {
  const { user } = useContext(UserContext);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <Nav>
        <Link className="link" to="/" onClick={handleLogout}>
          Logout
        </Link>
        <Link className="link" to="/leaderboard">
          Leaderboard
        </Link>
        <Link className="link" to="/">
          Home
        </Link>
      </Nav>

      <div>
        <h1>Welcome {user?.userName}</h1>
        <ProfileImage user={user} />
        <ProfileCard user={user} />
        <button
          className="bg-gradient-to-r from-[#C96868] to-[#7EACB5] text-white font-bold py-2 px-4 rounded my-4"
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
        <PlayerStats />
      </div>
    </>
  );
}

export default MyProfile;
