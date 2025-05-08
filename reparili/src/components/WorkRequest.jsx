import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideLayout from './SideLayout';
const WorkRequest = () => {
  const { builderCin } = useParams(); 
  const [workRequests, setWorkRequests] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:3000/auth/workrequests/${builderCin}`)
      .then((result) => {
        console.log('API Response:', result.data); 
        setWorkRequests(result.data);
      })
      .catch((error) => {
        console.error('Error fetching work requests:', error);
      });
  }, [builderCin]);
  

  const handleStatusUpdate = (id, newStatus) => {
    axios.put(`http://localhost:3000/auth/workrequests/update/${id}`, { status: newStatus })
      .then(() => {
        setWorkRequests(prev =>
          prev.map(req => req.id === id ? { ...req, status: newStatus } : req)
        );
      })
      .catch(error => {
        console.error('Error updating status:', error);
      });
  };
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/auth/workrequests/delete/${id}`)
      .then(() => {
        setWorkRequests(prev => prev.filter(req => req.id !== id));
      })
      .catch(error => {
        console.error('Error deleting work request:', error);
      });
  };
  return (
    <SideLayout>
    <div className='login-page'>
      <h1>List of Work Requests</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client CIN</th>
            <th>Client Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workRequests.map(request => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.client_cin}</td>
              <td>{request.client}</td>
              <td>{request.status}</td>
              <td className='action-td'>
                <button onClick={() => handleStatusUpdate(request.id, 'working on')} className="accept-btn">Accept</button>
                <button onClick={() => handleStatusUpdate(request.id, 'rejected')} className="reject-btn">Reject</button>
                <button onClick={() => handleStatusUpdate(request.id, 'done')} className="reject-btn">done</button>
                <button onClick={() => handleDelete(request.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div></SideLayout>
  );
};

export default WorkRequest;
