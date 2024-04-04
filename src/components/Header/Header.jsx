import React from "react";
import "./Header.css";
import { useNavigate } from "react-router";
import { account } from "../../lib/appwrite";

const Header = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await account.deleteSession("current");
    // alert("Logout successfully");
    navigate("/login");
  };

  return (
    <div className="header">
      <button type="button" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};

export default Header;
