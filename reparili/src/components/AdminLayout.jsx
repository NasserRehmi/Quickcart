import React from 'react';
import AdminSidebar from './AdminSidebar';
const AdminLayout = ({ children }) => {
  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};
export default AdminLayout;
