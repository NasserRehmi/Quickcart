import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
const AddBuilder = () => {
  const [values, setValues] = useState({
    cin: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    password: '',
    role: 'builder',
  });
  const [image, setImage] = useState(null); 
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(values).forEach(([key, val]) => formData.append(key, val));
    if (image) {
      formData.append("image", image);
    }

    axios
      .post("http://localhost:3000/auth/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((result) => {
        if (result.data.Status) {
          alert("Builder added successfully!");
          navigate("/admin/builders");
        } else {
          alert("Failed to add builder: " + result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred while adding the builder. Please try again.");
      });
  };
  return (
    <AdminLayout>
      <div className="add-content">
        <div className="add-card center">
          <h1>Add Builder</h1>
          <form className="add-form" onSubmit={handleSubmit} encType="multipart/form-data">
            {["cin", "nom", "prenom", "email", "telephone", "adresse", "password"].map((field) => (
              <div className="input-group" key={field}>
                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type={field === "password" ? "password" : "text"}
                  id={field}
                  required
                  onChange={(e) => setValues({ ...values, [field]: e.target.value })}
                />
              </div>
            ))}
            <div className="input-group">
              <label htmlFor="image">Profile Image</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button type="submit" className="submit-button">
              Add Builder
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddBuilder;
