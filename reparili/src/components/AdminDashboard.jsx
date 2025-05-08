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

        <div className="dashboard-stats">
          <div className="stat-card">
            <h2>Total Clients</h2>
            <p>{totalClients}</p>
          </div>
          <div className="stat-card">
            <h2>Total Builders</h2>
            <p>{totalBuilders}</p>
          </div>
          <div className="stat-card">
            <h2>Ongoing Repairs</h2>
            <p>{ongoingRepairs}</p>
          </div>
        </div>  
<br></br>
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <ul>
              <li><strong>Client Request:</strong> John Doe requested a repair for the bathroom.</li>
              <li><strong>Builder Update:</strong> Mike’s project is in progress.</li>
              <li><strong>Reclamation:</strong> Client Jane Smith reported safety issues.</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
