import React from "react";
import "../../css/ProfileCard.css";

const ProfileCard = ({ user }) => {
  return (
    <div className="profile-card">
      <div className="profile-card-header">
        <h3 className="username">{user?.userName}'s Profile</h3>
      </div>

      <div className="content">
        <dl className="profile-details">
            <div className="detail">
              <dt>Username</dt>
              <dd>{user?.userName}</dd>
          </div>

          <div className="detail">
            <dt>First Name</dt>
            <dd>{user?.firstName}</dd>
          </div>

          <div className="detail">
            <dt>Last Name</dt>
            <dd>{user?.lastName}</dd>
          </div>

          <div className="detail">
            <dt>Email address</dt>
            <dd>{user?.email}</dd>
          </div>

          <div className="detail">
            <dt>Location</dt>
            <dd>{user?.location}</dd>
          </div>

          <div className="detail">
            <dt>Number of Games</dt>
            <dd>{user?.gamesPlayed}</dd>
          </div>

          <div className="detail">
            <dt>Highest Score</dt>
            <dd>{user?.highScore}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ProfileCard;
