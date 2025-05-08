import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CsLayout from './CsLayout';

const WorkRequestDetails = () => {
  const { id } = useParams();
  const [work, setWork] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/auth/workrequests/details/${id}`)
      .then(res => setWork(res.data))
      .catch(err => console.error('Error fetching details:', err));
  }, [id]);

  if (!work) return <p>Loading...</p>;

  return (
    <CsLayout>
    <div className="login-page">
      <h1>Work Request Details</h1>
      <p><strong>Client Name:</strong> {work.client_name}</p>
      <p><strong>Builder Name:</strong> {work.builder_name}</p>
      <p><strong>Surface Area:</strong> {work.surface} m²</p>
      <p><strong>Address:</strong> {work.adresse}</p>
      <p><strong>Status:</strong> {work.status}</p>
      <div className="photo-gallery">
        {JSON.parse(work.images).map((img, index) => (
          <img
            key={index}
            src={`http://localhost:3000/uploads/${img}`}
            alt={`picture ${index + 1}`}
            style={{ maxWidth: '200px', margin: '10px' }}
          />
        ))}
      </div>
    </div></CsLayout>
  );
};

export default WorkRequestDetails;
