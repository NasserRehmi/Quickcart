import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CsLayout from './CsLayout';
const Request = () => {
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [photos, setPhotos] = useState([]);
  const { cin } = useParams();
  const clientCin = localStorage.getItem("cin");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("clientCin", clientCin);
    formData.append("cin", cin);
    formData.append("area", area);
    formData.append("address", address);
   
    if (!clientCin){console.log('there is no cliient cin ')}
    photos.forEach((photo) => formData.append("photos", photo));
  
    axios.post("http://localhost:3000/auth/requests", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      alert("Request submitted successfully!");
      console.log(response.data);
    })
    .catch((error) => {
      alert("Failed to submit request.");
      console.error(error);
    });
  };

  const handlePhotoChange = (e) => {
    setPhotos([...e.target.files]);
  };

  return (
    <CsLayout>
    <div className='login-page'>
      <div className='add-card center'>
      <h1>House Request Form</h1>
      <form onSubmit={handleSubmit} className='add-form'>
      <div className="input-group">
          <label htmlFor="area">Area (in metre squired):</label>
          <input
            type="number"
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="photos">Upload Photos:</label>
          <input
            type="file"
            id="photos"
            onChange={handlePhotoChange}
            multiple
            accept="image/*"
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form></div>
    </div></CsLayout>
  );
};

export default Request;