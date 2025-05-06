import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSignInAlt, FaUserPlus, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Roamify Logo" className="logo-img" />
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/"><FaHome size={28} color="white" title="Home" /></Link>
        </li>
        {!user ? (
          <>
            <li><Link to="/login"><FaSignInAlt size={28} color="white" title="Login" /></Link></li>
            <li><Link to="/signup"><FaUserPlus size={28} color="white" title="Sign Up" /></Link></li>
          </>
        ) : (
          <>
            <li title="Profile"><FaUserCircle size={28} color="white" /></li>
            <li onClick={handleLogout} title="Logout"><FaSignOutAlt size={28} color="white" style={{ cursor: "pointer" }} /></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
