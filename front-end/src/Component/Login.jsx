import { Fragment, useContext, useState, useEffect } from "react";
import { signin } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { UserContext } from "../context/AuthContext";
import "../css/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showModal, setShowModal, isLoggedOut } = useContext(UserContext);
  let navigate = useNavigate();

  function handleLogin() {
    console.log("Attempting to log in with:", email, password);
    signin(email, password);
    navigate("/");
  }

  useEffect(() => {
    if (isLoggedOut) {
      setShowModal(true);
    }
  }, [isLoggedOut]);

  return (
    <Fragment>
      <Modal
        isVisible={showModal}
        onClose={() => {
          setShowModal(false);
          navigate("/");
        }}
      >
        <div className="login-container">
          <button
            className="close-button"
            onClick={() => {
              setShowModal(false);
              navigate("/");
            }}
          >
            X
          </button>
          <h2 className="login-title">Login</h2>
          <div className="input-group">
            <label className="label">Email Address</label>
            <input
              className="input"
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleLogin} className="login-button">
            Log in
          </button>
          <p className="signup-text">
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign up here
            </Link>
          </p>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Login;
