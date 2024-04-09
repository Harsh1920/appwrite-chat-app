import React from "react";
import "./Header.css";
import { useNavigate } from "react-router";
import { account } from "../../lib/appwrite";
import  logout  from "../../assets/logout.jsx";
import Logout from "../../assets/logout.jsx";
import { FaRocketchat,FaSignOutAlt } from "react-icons/fa";
const Header = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
   if (confirm("Are you sure want to logout?")) {
    await account.deleteSession("current");
    // alert("Logout successfully");
    navigate("/login");
   }
    
  };

  return (
    <div className="header">
      <div className="header__icons_outer">
        
        <FaRocketchat className="header__icon header__icon_active" />
        
        <FaSignOutAlt className="header__icon" onClick={logoutHandler}/>
        {/* <div className="header__logout" onClick={logoutHandler}>        
          <Logout />
        </div> */}
        </div>
      
    </div>
  );
};

export default Header;
