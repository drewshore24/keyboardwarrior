import myImage from "../../images/download.png";
import "../../css/ProfileImage.css";

const ProfileImage = ({ user }) => {
  return (
    <img
      className="profile-image"
      src={user?.imgUrl ? user?.imgUrl : myImage}
      alt="profile picture"
    />
  );
};

export default ProfileImage;
