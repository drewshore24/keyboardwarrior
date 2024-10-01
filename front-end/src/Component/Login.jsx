import { Fragment, useContext, useState } from "react";
import { signin } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { UserContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showModal, setShowModal } = useContext(UserContext);

  let navigate = useNavigate();

  function handleLogin() {
    signin(email, password);
    navigate("/");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  //
  return (
    <Fragment>
      <Modal
        isVisible={showModal}
        onClose={() => {
          setShowModal(false);
          navigate("/");
        }}
      >
        <div className="max-w-[350px] w-full mx-auto border border-[#C96868] rounded-2xl p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email Address
                </label>
                <input
                  name="email"
                  type="text"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="!mt-12">
              <button
                type="button"
                onClick={handleLogin}
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-[#C96868] hover:bg-[#D2E0FB] focus:outline-[#C96868]"
              >
                Log in
              </button>
            </div>
            <p className="text-gray-800 text-sm mt-6 text-center">
              Don't have an account?
              <Link
                to="/signup"
                className="text-[#C96868] font-semibold hover:underline ml-1"
              >
                Sign up here
              </Link>
            </p>
          </form>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Login;
