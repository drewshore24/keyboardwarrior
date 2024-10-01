import { Fragment, useContext, useState } from "react";
import { signUp } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { UserContext } from "../context/AuthContext";

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
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const canSave = [...Object.values(data)].every(Boolean);
  let navigate = useNavigate();
  function handleClick() {
    console.log("clicked");

    signUp(data.email, data.userName, userData);
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
                  Username
                </label>
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
                  Email Address
                </label>
                <input
                  name="email"
                  type="text"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter email"
                  value={data.email}
                  onChange={handleChange}
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
                  value={data.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter confirm password"
                  value={data.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="!mt-12">
              <button
                type="button"
                disabled={!canSave}
                onClick={handleClick}
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-[#C96868] hover:bg-[#D2E0FB] focus:outline-[#C96868]"
              >
                Create account
              </button>
            </div>
            <p className="text-gray-800 text-sm mt-6 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#C96868] font-semibold hover:underline ml-1"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </Modal>
    </Fragment>
  );
};

export default CreateUser;
