import { Fragment, useContext, useState } from "react";
import { signUp } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { UserContext } from "../context/AuthContext";
import { createData } from "../utils/crud";
import '../css/SignUp.css'
import NavBar from './NavBar';

const CreateUser = () => {
  const { showModal, setShowModal } = useContext(UserContext);
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const userData = {
    userName: data.userName,
    email: data.email,
  };

  const stats = {
    gamesPlayed: 0,
    highScore: 0,
    lastTenWpm: [],
    lastTenAccuracy: [],
    averageWpm: 0,
    averageAccuracy: 0,
    accuracy: 0,
    wpm: 0,
    cpm: 0,
  };

  const canSave = [...Object.values(data)].every(Boolean);
  let navigate = useNavigate();

  function handleClick() {
    signUp(data.email, data.password, userData).then((user) => {
      createData("gameStats", stats, user.uid).then(() =>
        console.log("collection created")
      );
    });
    navigate("/");
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Fragment>
      <NavBar />

      <Modal
        isVisible={showModal}
        onClose={() => {
          setShowModal(false);
          navigate("/");
        }}
      >
        <div className="login-container">
          <div className="space-y-6">
            <div className="input-group">
              <h2>Sign up</h2>
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
              <label className="label">Email Address</label>
              <input
                name="email"
                type="text"
                className="input"
                placeholder="Enter email"
                value={data.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                className="input"
                placeholder="Enter password"
                value={data.password}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label className="label">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                className="input"
                placeholder="Enter confirm password"
                value={data.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="login-button-container">
            <button
              type="button"
              disabled={!canSave}
              onClick={handleClick}
              className="login-button"
            >
              Create account
            </button>
          </div>
          <p className="signup-text">
            Already have an account?{" "}
            <Link to="/login" className="signup-link">
              Login here
            </Link>
          </p>
        </div>
      </Modal>
    </Fragment>
  );
};

export default CreateUser;
