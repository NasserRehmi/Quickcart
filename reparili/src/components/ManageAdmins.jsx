import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/admins', { withCredentials: true })
      .then((response) => {
        console.log("Admin response:", response.data);
        setAdmins(response.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching admins:', error);
        setLoading(false);
      });
  }, []);
  

  const handleDelete = (cin) => {
    axios.delete(`http://localhost:3000/auth/admins/${cin}`, { withCredentials: true })
      .then(() => {
        setAdmins(admins.filter(admin => admin.cin !== cin));
        alert('Admin deleted successfully');
      })
      .catch((error) => {
        console.log('Error deleting admin:', error);
      });
  };

  return (
    <AdminLayout><div className="main-content">
      <div className="top-bar">
        <div className="welcome-message">Manage Admins</div>
      </div>

      <div className="client-list">
        {loading ? (
          <p>Loading admins...</p>
        ) : (
          <div className="dashboard-stats">
            <table className="reclamation-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Adresse</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.cin}>
                    <td>{admin.nom}</td>
                    <td>{admin.prenom}</td>
                    <td>{admin.email}</td>
                    <td>{admin.telephone}</td>
                    <td>{admin.adresse}</td>
                    <td>
                      <Link to={`/editadmin/${admin.cin}`} className="edit-button">
                        Edit
                      </Link>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(admin.cin)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="add-client">
        <Link to="/admin/addadmin" className="add-client-button">
          Add New Admin
        </Link>
      </div></div>
    </AdminLayout>
  );
};

export default ManageAdmins;
