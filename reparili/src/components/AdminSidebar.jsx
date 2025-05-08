import React from 'react';
import { Link } from 'react-router-dom';
const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-title">Admin Dashboard</div>
      <nav>
        <ul>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/clients">Manage Clients</Link></li>
          <li><Link to="/admin/builders">Manage Builders</Link></li>
          <li><Link to="/admin/admins">Manage Admins</Link></li>
          <li><Link to="/admin/reclamations">Reclamations</Link></li>
        </ul>
      </nav>
    </div>
  );
};
export default AdminSidebar;
