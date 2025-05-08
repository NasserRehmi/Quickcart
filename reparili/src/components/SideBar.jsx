import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SideBar = () => {
  const navigate = useNavigate();
  const cin = localStorage.getItem('cin');
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("valid");
      localStorage.removeItem("token");
      axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true })
        .then(() => console.log("Logged out successfully"))
        .catch((err) => console.error("Logout error:", err));
      navigate("/login");
    }
  };
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Reparili</h2>
      <nav className="sidebar-nav">
        <ul>
        <li><Link to={`/workrequest/${cin}`} className="sidebar-link">
          Work Requests
        </Link></li>
        <li><Link to={`/builder/details/${cin}`} className="sidebar-link">
          My Details
        </Link></li>
        <li><button className="sidebar-button" onClick={handleLogout}>
          Logout
        </button></li>
        </ul>
      </nav>
    </div>
  );
};
export default SideBar;
