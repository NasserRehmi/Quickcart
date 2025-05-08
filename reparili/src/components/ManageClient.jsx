import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
const ManageClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('http://localhost:3000/auth/clients', { withCredentials: true })
      .then((response) => {
        setClients(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching clients:', error);
        setLoading(false);
      });
  }, []);
  const handleDelete = (clientCin) => {
    axios.delete(`http://localhost:3000/auth/clients/${clientCin}`, { withCredentials: true })
      .then(() => {
        setClients(clients.filter(client => client.cin !== clientCin));
        alert('Client deleted successfully');
      })
      .catch((error) => {
      console.log('Error deleting client:', error);
      });
  };
  return (
    <AdminLayout>
     <div className="main-content">
  <div className="top-bar">
    <div className="welcome-message">Manage Clients</div>
  </div>
  <div className="client-list">
    {loading ? (
      <p>Loading clients...</p>
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
            {clients.map((client) => (
              <tr key={client.cin}>
                <td>{client.nom}</td>
                <td>{client.prenom}</td>
                <td>{client.email}</td>
                <td>{client.telephone}</td>
                <td>{client.adresse}</td>
                <td className="actions">
                  <Link to={`/editclient/${client.cin}`} className="edit-button">
                    Edit
                  </Link>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(client.cin)}
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
    <Link to="/admin/addclient" className="add-client-button">
      Add New Client
    </Link>
  </div>
</div>
    </AdminLayout>
  );
};

export default ManageClients;
