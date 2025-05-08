import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AdminLayout from "./AdminLayout";
const AdminEditBuilder = () => {
  const navigate = useNavigate();
  const { cin } = useParams();
  const [builder, setBuilder] = useState({
    cin: "",
    nom: "",
    prenom: "",
    email: "",
    adresse: "",
    telephone: "",
    mdp: "",
  });
  useEffect(() => {
    if (cin) {
      axios.get(`http://localhost:3000/auth/builder/${cin}`)
        .then((res) => {
          const data = res.data.Result; 
          setBuilder({
            cin,
            nom: data.nom || "",
            prenom: data.prenom || "",
            email: data.email || "",
            adresse: data.adresse || "",
            telephone: data.telephone || "",
            mdp: "",
          });
        })
        .catch((err) => console.error("Error fetching builder data:", err));
    }
  }, [cin]);
  const handleChange = (e) => {
    setBuilder({ ...builder, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/auth/builderupdate", builder)
      .then(() => navigate("/admin/builders"))
      .catch((error) => console.error("Error updating builder:", error));
  };
  return (
    <AdminLayout>
      <div className="main-content">
        <h2 className="center">Update Builder</h2>
        <form className="update-form" onSubmit={handleSubmit}>
          <input type="text" name="cin" value={builder.cin} disabled />
          <input type="text" name="nom" placeholder="Nom" value={builder.nom} onChange={handleChange} />
          <input type="text" name="prenom" placeholder="Prénom" value={builder.prenom} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={builder.email} onChange={handleChange} />
          <input type="tel" name="telephone" placeholder="Téléphone" value={builder.telephone} onChange={handleChange} />
          <input type="text" name="adresse" placeholder="Adresse" value={builder.adresse} onChange={handleChange} />
          <input type="password" name="mdp" placeholder="New Password (Optional)" value={builder.mdp} onChange={handleChange} />
          <button type="submit">Update</button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminEditBuilder;
