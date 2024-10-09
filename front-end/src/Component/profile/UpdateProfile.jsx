import { useContext, useEffect, useState } from "react";
import Modal from "../Modal";
import { UserContext } from "../../context/AuthContext";
import { updateData } from "../../utils/crud";
import { ToastContainer } from "react-toastify";
import Countries from "./Countries";
import ImageUpload from "./ImageUpload";
import defaultImg from '../../images/Daffy-Duck.jpg'
 
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
  console.log(canSave)

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
      <div className="max-w-[350px] w-full mx-auto border border-[#C96868] rounded-2xl p-8">
        <div className="space-y-6">
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Username</label>
            <input
              name="userName"
              type="text"
              className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
              placeholder="Enter username"
              value={data.userName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              firstName
            </label>
            <input
              name="firstName"
              type="text"
              className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
              placeholder="First Name"
              value={data.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
              placeholder="Last Name"
              value={data.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Email</label>
            <input
              name="email"
              type="text"
              className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Profile Picture
            </label>
            <ImageUpload user={user} setImgUrl={setImgUrl} />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Location</label>
            <Countries
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          </div>
        </div>
        <div className="!mt-12">
          <button
            type="button"
            onClick={handleClick}
            disabled={!canSave}
            className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-[#C96868] hover:bg-[#D2E0FB] focus:outline-[#C96868]"
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
