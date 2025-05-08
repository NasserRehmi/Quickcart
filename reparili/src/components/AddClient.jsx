import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";

const AddClient = () => {
  const [values, setValues] = useState({
    cin: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    password: '',
    role:'client',
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/signup", values)
      .then((result) => {
        if (result.data.Status) {
          alert("Client added successfully!");
          navigate("/admin/clients");
        } else {
          alert("Failed to add client: " + result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred while adding the client. Please try again.");
      });
  };

  return (
    <AdminLayout>
    <div className="add-content ">
      <div className="add-card center">
        <h1>Add Client</h1>
        <form className="add-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="cin">CIN</label>
            <input
              type="text"
              id="cin"
              required
              onChange={(e) => setValues({ ...values, cin: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              id="nom"
              required
              onChange={(e) => setValues({ ...values, nom: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="prenom">Prenom</label>
            <input
              type="text"
              id="prenom"
              required
              onChange={(e) => setValues({ ...values, prenom: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="telephone">Telephone</label>
            <input
              type="text"
              id="telephone"
              required
              onChange={(e) =>
                setValues({ ...values, telephone: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label htmlFor="adresse">Adresse</label>
            <input
              type="text"
              id="adresse"
              required
              onChange={(e) =>
                setValues({ ...values, adresse: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
          <button type="submit" className="submit-button">
            Add Client
          </button>
        </form>
      </div>
    </div></AdminLayout>
  );
};

export default AddClient;
