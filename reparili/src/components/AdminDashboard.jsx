import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../components/AdminLayout"; 

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("Admin");
  const [totalClients, setTotalClients] = useState(0);
  const [totalBuilders, setTotalBuilders] = useState(0);
  const [ongoingRepairs, setTotalWorks] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/countusers', { withCredentials: true })
      .then(result => {
        console.log('API Response:', result.data);
        setTotalClients(result.data.clients);
        setTotalBuilders(result.data.builders);
        setTotalWorks(result.data.ongoingRepairs);
      })
      .catch(error => {
        console.log('Error fetching user counts:', error);
        if (error.response) {
          console.log('Error response:', error.response.data);
        }
      });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AdminLayout>
      <div className="main-content">
        <div className="top-bar">
          <div className="welcome-message">Welcome, {adminName}</div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>

        <div className="dashboard-stats-vertical">
          <div className="stat-card-expanded">
            <h2>Client Management</h2>
            <p className="stat-number">{totalClients}</p>
            <p className="stat-description">
              This represents the total number of registered clients in the system. 
              Clients can request repair services and track their ongoing projects through our platform.
            </p>
            <Link to="/admin/clients" className="view-details-link">View All Clients →</Link>
          </div>

          <div className="stat-card-expanded">
            <h2>Builder Network</h2>
            <p className="stat-number">{totalBuilders}</p>
            <p className="stat-description">
              These are the skilled builders currently registered on our platform. 
              Each builder has been verified and can be assigned to client repair projects.
            </p>
            <Link to="/admin/builders" className="view-details-link">Manage Builders →</Link>
          </div>

          <div className="stat-card-expanded">
            <h2>Active Repair Projects</h2>
            <p className="stat-number">{ongoingRepairs}</p>
            <p className="stat-description">
              These are the currently ongoing repair projects being managed through our system. 
              You can monitor progress, assign builders, and update project statuses.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;