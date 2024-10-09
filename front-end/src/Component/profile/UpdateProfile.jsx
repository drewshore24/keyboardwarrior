import { useContext, useEffect, useState } from "react";
import Modal from "../Modal";
import { UserContext } from "../../context/AuthContext";
import { updateData } from "../../utils/crud";
import { ToastContainer } from "react-toastify";
import Countries from "./Countries";
import ImageUpload from "./ImageUpload";
import '../../css/UpdateProfile.css'

const UpdateProfile = ({ setShowUpdateModal, showUpdateModal }) => {
  const { user } = useContext(UserContext);
  const [selectedCountry, setSelectedCountry] = useState(user?.location);
  const [imgUrl, setImgUrl] = useState(user?.imgUrl);
  const { label = "UK" } = selectedCountry || {};

  const [data, setData] = useState({
    userName: user?.userName,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
  });

  const userData = {
    userName: data.userName,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    location: label,
    imgUrl,
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const canSave = [...Object.values(userData)].every(Boolean);

  function handleClick() {
    updateData("users", user?.uid, userData);
    setShowUpdateModal(false);
  }

  useEffect(() => {
    if (userData?.userName !== undefined) {
      handleClick();
    }
  }, [user]);

  return (
    <Modal
      isVisible={showUpdateModal}
      onClose={() => {
        setShowUpdateModal(false);
      }}
    >
      <div className="update-profile-container">
        <div className="space-y-6">
          <div className="input-group">
            <label className="label">Username</label>
            <input
              name="userName"
              type="text"
              className="input"
              placeholder="Enter username"
              value={data.userName}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label className="label">First Name</label>
            <input
              name="firstName"
              type="text"
              className="input"
              placeholder="First Name"
              value={data.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label className="label">Last Name</label>
            <input
              name="lastName"
              type="text"
              className="input"
              placeholder="Last Name"
              value={data.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label className="label">Email</label>
            <input
              name="email"
              type="text"
              className="input"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label className="label">Profile Picture</label>
            <ImageUpload user={user} setImgUrl={setImgUrl} />
          </div>
          <div className="input-group">
            <label className="label">Location</label>
            <Countries
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          </div>
        </div>
        <div className="button-container">
          <button
            type="button"
            onClick={handleClick}
            disabled={!canSave}
            className="update-button"
          >
            Update Profile
          </button>
        </div>
        <ToastContainer position="top-center" theme="colored" />
      </div>
    </Modal>
  );
};

export default UpdateProfile;
