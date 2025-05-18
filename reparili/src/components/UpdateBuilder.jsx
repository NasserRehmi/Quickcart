import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideLayout from "./SideLayout";

const UpdateBuilder = () => {
  const navigate = useNavigate();
  const [builder, setBuilder] = useState({
    cin: "",
    adresse: "",
    email: "",
    telephone: "",
    mdp: "",
    paymeeApiKey: "",
    paymentInfoNote: "",
  });

  useEffect(() => {
    const storedCin = localStorage.getItem("cin");
    if (storedCin) {
      setBuilder((prev) => ({ ...prev, cin: storedCin }));

      // Optional: fetch existing builder data including Paymee key & notes
      // axios.get(`http://localhost:3000/auth/builder/${storedCin}`)
      //   .then(res => setBuilder(prev => ({ ...prev, ...res.data })))
      //   .catch(console.error);
    }
  }, []);

  const handleChange = (e) => {
    setBuilder({ ...builder, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/auth/builderupdate", builder)
      .then(() => navigate(`/builder/details/${builder.cin}`))
      .catch((error) => console.error("Error updating builder:", error));
  };

  return (
    <SideLayout>
      <div className="client-page" style={{ maxWidth: "450px", margin: "auto" }}>
        <h2>Update Builder</h2>
        <form className="update-form" onSubmit={handleSubmit}>
          <label>
            CIN (cannot be changed)
            <input type="text" name="cin" value={builder.cin} disabled />
          </label>

          <label>
            Téléphone
            <input
              type="tel"
              name="telephone"
              placeholder="Téléphone"
              value={builder.telephone}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={builder.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Adresse
            <input
              type="text"
              name="adresse"
              placeholder="Adresse"
              value={builder.adresse}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            New Password (Optional)
            <input
              type="password"
              name="mdp"
              placeholder="New Password"
              value={builder.mdp}
              onChange={handleChange}
            />
          </label>

          <label>
            Paymee API Key
            <input
              type="text"
              name="paymeeApiKey"
              placeholder="Enter your Paymee API Key"
              value={builder.paymeeApiKey}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Additional Payment Info (optional)
            <textarea
              name="paymentInfoNote"
              placeholder="e.g. Merchant ID, special instructions"
              value={builder.paymentInfoNote}
              onChange={handleChange}
              rows={3}
            />
          </label>

          <button type="submit" style={{ marginTop: "20px" }}>
            Update
          </button>
        </form>
      </div>
    </SideLayout>
  );
};

export default UpdateBuilder;
