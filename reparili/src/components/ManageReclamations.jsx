import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
const ManageReclamations = () => {
  const [reclamations, setReclamations] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('http://localhost:3000/auth/reclamations', { withCredentials: true })
      .then((response) => {
        setReclamations(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching reclamations:', error);
        setLoading(false);
      });
  }, []);
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/auth/reclamations/${id}`, { withCredentials: true })
      .then(() => {
        setReclamations(reclamations.filter(reclamation => reclamation.id !== id));
        alert('Reclamation deleted successfully');
      })
      .catch((error) => {
        console.log('Error deleting reclamation:', error);
      });
  };
  return (
    <AdminLayout>
      <div className="main-content">
        <div className="top-bar">
          <div className="welcome-message">Manage Reclamations</div>
        </div>
        <div className="reclamation-list">
          {loading ? (
            <p>Loading reclamations...</p>
          ) : (
            <div className="dashboard-stats">
              <table className="reclamation-table">
                <thead>
                  <tr>
                    <th>Reporter</th>
                    <th>Reported</th>
                    <th>Report</th>
                    
                    <th>date </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reclamations.map((reclamation) => (
                    <tr key={reclamation.id}>
                      <td>{reclamation.reporter}</td>
                      <td>{reclamation.reported}</td>
                      <td>{reclamation.report}</td>
                      <td>{new Date(reclamation.date_created).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(reclamation.id)}
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
      </div>
    </AdminLayout>
  );
};

export default ManageReclamations;
