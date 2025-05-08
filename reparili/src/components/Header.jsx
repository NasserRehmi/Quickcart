import React from "react";
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import RepariliLogo from "./RepariliLogo";
const Header = () => {
  const navigate = useNavigate(); 
  const handleLoginClick = () => {
    navigate("/login"); 
  };
  const handleSignupClick = () => {
    navigate("/signup"); 
  };
  return (
    <header className="header">
      <div className="logo"><RepariliLogo /></div>
      <ul className="nav-list">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      <div className="auth-buttons">
        <button className="signup-btn" onClick={handleLoginClick}>Login</button>
        <button className="signup-btn" onClick={handleSignupClick}>Sign Up</button>
      </div>
    </header>
  );
};
export default Header;