import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const Login = () => {
  const [values, setValues] = useState({
    email: '',
    mdp: '',
    role: 'client' 
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.defaults.withCredentials = true;
    let endpoint = '';
    if (values.role === 'builder') {
      endpoint = 'http://localhost:3000/auth/loginbuilder';
    } else if (values.role === 'admin') {
      endpoint = 'http://localhost:3000/auth/loginadmin';
    } else {
      endpoint = 'http://localhost:3000/auth/loginclient';
    }
    axios.post(endpoint, values)
      .then(result => {
        console.log("Login response:", result.data);
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true);
          localStorage.setItem("cin", result.data.cin);
          localStorage.setItem("role", values.role);
          if (values.role === 'builder') {
            navigate(`/workrequest/${result.data.cin}`);
          } else if (values.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/builders');
          }
        } else {
          setError(result.data.Error);
        }
      })
      .catch(err => {
        console.log("Login error:", err);
        setError("Something went wrong.");
      });
  };
  return (
    <section className="login-page">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p>Sign in to continue</p>
        <form className="login-form" onSubmit={handleSubmit}>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setValues({ ...values, mdp: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label>Login as:</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="client"
                  checked={values.role === 'client'}
                  onChange={(e) => setValues({ ...values, role: e.target.value })}
                />
                Client
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="builder"
                  checked={values.role === 'builder'}
                  onChange={(e) => setValues({ ...values, role: e.target.value })}
                />
                Builder
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={values.role === 'admin'}
                  onChange={(e) => setValues({ ...values, role: e.target.value })}
                />
                Admin
              </label>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-button">Login</button>
        </form>

        <div className="alternative-actions">
          <button className="back-button" onClick={handleBackToHome}>Back to Home</button>
          <a href="#forgot-password" className="forgot-password">Forgot Password?</a>
        </div>
      </div>
    </section>
  );
};
export default Login;
