import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CsLayout from './CsLayout';
const ClientWorkPage = () => {
  const { clientCin } = useParams(); 
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`http://localhost:3000/auth/clientwork/${clientCin}`)
      .then(result => {
        setWorks(result.data);
      })
      .catch(error => {
        console.error('Error fetching work requests:', error);
      })
      .finally(() => setLoading(false));
  }, [clientCin]);
  return (
    <CsLayout>
    <div className='login-page'>
      <h1>My Work Requests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : works.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>builder cin</th>
              <th>builder name</th>
              <th>Status</th>
              
            </tr>
          </thead>
          <tbody>
            {works.map(work => (
              <tr key={work.id}>
                <td>{work.id}</td>
                <td>{work.builder_cin}</td>
                <td>{work.builder_name}</td>
                <td>{work.status}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No work requests found.</p>
      )}
    </div>
    </CsLayout>
  );
};

export default ClientWorkPage;
