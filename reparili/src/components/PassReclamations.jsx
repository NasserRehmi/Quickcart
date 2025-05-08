import { useState, useEffect } from "react";
import axios from "axios";
import CsLayout from './CsLayout';
const PassReclamation = () => {
  const [builders, setBuilders] = useState([]);
  const [selectedBuilder, setSelectedBuilder] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const cin = localStorage.getItem('cin');
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/builders")
      .then((result) => {
        if (result.data.Status) {
          setBuilders(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBuilder || !description) {
      setMessage("Please select a builder and describe your reclamation");
      return;
    }
    axios.post("http://localhost:3000/auth/passreclamation", {
      reporter : cin ,
      builderId: selectedBuilder,
      description: description
    })
    .then((result) => {
      if (result.data.Status) {
        setMessage("Reclamation submitted successfully!");
        setSelectedBuilder("");
        setDescription("");
      } else {
        setMessage(result.data.Error);
      }
    })
    .catch((err) => {
      console.log(err);
      setMessage("An error occurred while submitting the reclamation");
    });
  };

  return (
    <CsLayout>
      <div className="login-page">
        <div className="builders-container">
          <h2 className="section-title">Submit a Reclamation</h2>
          
          <form onSubmit={handleSubmit} className="reclamationForm">
  <div className="formGroup">
    <label htmlFor="builder-select">Select Builder:</label>
    <select
      id="builder-select"
      className="formControl"
      value={selectedBuilder}
      onChange={(e) => setSelectedBuilder(e.target.value)}
    >
      <option value="">-- Select a builder --</option>
      {builders.map((builder) => (
        <option key={builder.cin} value={builder.cin}>
          {builder.nom} {builder.prenom}
        </option>
      ))}
    </select>
  </div>
  <div className="formGroup">
    <label htmlFor="description">Description:</label>
    <textarea
      id="description"
      className="formControl"
      rows="5"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Describe your reclamation in detail..."
    ></textarea>
  </div>
  <button type="submit" className="submitBtn">
    Submit Reclamation
  </button>
  {message && <div className="formMessage">{message}</div>}
</form>
        </div>
      </div>
    </CsLayout>
  );
};

export default PassReclamation;