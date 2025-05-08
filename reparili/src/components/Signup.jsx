import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from 'axios';

const Signup = () => {
  const [values, setValues] = useState({
    cin: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    password: '',
    role: 'client',
  });
  const [image, setImage] = useState(null); 
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (image) {
      formData.append("image", image);
    }
  
    axios
      .post("http://localhost:3000/auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        if (result.data.Status) {
          alert("Signup successful! Redirecting to login...");
          navigate("/login"); 
        } else {
          alert("Signup failed: " + result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred while signing up. Please try again.");
      });
  }
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <section className="login-page">
      <div className="login-card">
        <h1>Welcome</h1>
        <p>Sign up to continue</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="cin">CIN</label>
            <input
              type="text"
              id="cin"
              placeholder="Entrer votre CIN"
              required
              onChange={(e) => setValues({ ...values, cin: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              id="nom"
              placeholder="Entrer votre nom"
              required
              onChange={(e) => setValues({ ...values, nom: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="prenom">Prenom</label>
            <input
              type="text"
              id="prenom"
              placeholder="Entrer votre prenom"
              required
              onChange={(e) => setValues({ ...values, prenom: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="telephone">Telephone</label>
            <input
              type="text"
              id="telephone"
              placeholder="Entrer votre telephone"
              required
              onChange={(e) => setValues({ ...values, telephone: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="adresse">Adresse</label>
            <input
              type="text"
              id="adresse"
              placeholder="Entrer votre adresse"
              required
              onChange={(e) => setValues({ ...values, adresse: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Entrer votre mot de passe"
              required
              onChange={(e) => setValues({ ...values, password: e.target.value })}
            />
          </div>
          <div className="select-group">
            <label className="label" htmlFor="role">Sélectionner un rôle</label>
            <select
              className="select"
              id="role"
              required
              value={values.role}
              onChange={(e) => setValues({ ...values, role: e.target.value })}
            >
              <option value="builder">Builder</option>
              <option value="client">Client</option>
            </select>
          </div>
          {values.role === 'builder' && (
            <div className="input-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          )}
          <button type="submit" className="submit-button">
            Sign up
          </button>
        </form>
        <div className="alternative-actions">
          <button className="back-button" onClick={handleBackToHome}>
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default Signup;