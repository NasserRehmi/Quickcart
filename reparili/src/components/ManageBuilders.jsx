import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';

const ManageBuilders = () => {
  const [builders, setBuilders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/builders', { withCredentials: true })
      .then((response) => {
        setBuilders(response.data.Result);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching builders:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (cin) => {
    axios.delete(`http://localhost:3000/auth/builders/${cin}`, { withCredentials: true })
      .then(() => {
        setBuilders(builders.filter(builder => builder.cin !== cin));
        alert('Builder deleted successfully');
      })
      .catch((error) => {
        console.log('Error deleting builder:', error);
      });
  };

  return (
    <AdminLayout>
        <div className="main-content">
      <div className="top-bar">
        <div className="welcome-message">Manage Builders</div>
      </div>

      <div className="client-list">
        {loading ? (
          <p>Loading builders...</p>
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
                {builders.map((builder) => (
                  <tr key={builder.cin}>
                    <td>{builder.nom}</td>
                    <td>{builder.prenom}</td>
                    <td>{builder.email}</td>
                    <td>{builder.telephone}</td>
                    <td>{builder.adresse}</td>
                    <td>
                      <Link to={`/editbuilder/${builder.cin}`} className="edit-button">
                        Edit
                      </Link>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(builder.cin)}
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
        <Link to="/admin/addbuilder" className="add-client-button">
          Add New Builder
        </Link>
      </div></div>
    </AdminLayout>
  );
};

export default ManageBuilders;
