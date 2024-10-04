import React from "react";

const Button = ({ children }) => {
  return (
    <button className="bg-gradient-to-r from-[#C96868] to-[#7EACB5] text-white font-bold py-2 px-4 rounded my-4">
      {children}
    </button>
  );
};

export default Button;
