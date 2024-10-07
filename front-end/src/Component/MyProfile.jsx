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
        <Link
          className="bg-gradient-to-r from-[#7EACB5] to-[#C96868] text-white font-bold py-2 px-4 rounded my-4 mx-1"
          to="/"
          onClick={handleLogout}
        >
          Logout
        </Link>
        <Link
          className="bg-gradient-to-r from-[#C96868] to-[#FADFA1] text-white font-bold py-2 px-4 rounded my-4 mx-1"
          to="/leaderboard"
        >
          Leaderboard
        </Link>
        <Link
          className="bg-gradient-to-r from-[#FADFA1] to-[#7EACB5] text-white font-bold py-2 px-4 rounded my-4 mx-1"
          to="/"
        >
          Home
        </Link>
      </Nav>

      <div>
        <h1>Welcome {user?.userName}</h1>
        <ProfileImage user={user} />
        <div className="flex">
          <div className="flex flex-col mr-4">
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
          </div>

          <PlayerStats />
        </div>
      </div>
    </>
  );
}

export default MyProfile;
