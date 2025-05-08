import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AdminLayout from "./AdminLayout";
const AdminEditAdmin = () => {
  const navigate = useNavigate();
  const { cin } = useParams();
  const [admin, setAdmin] = useState({
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
      axios.get(`http://localhost:3000/auth/admin/${cin}`)
        .then((res) => {
          const data = res.data.Result;
          setAdmin({
            cin,
            nom: data.nom || "",
            prenom: data.prenom || "",
            email: data.email || "",
            adresse: data.adresse || "",
            telephone: data.telephone || "",
            mdp: "",
          });
        })
        .catch((err) => console.error("Error fetching admin data:", err));
    }
  }, [cin]);
  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/auth/adminupdate", admin)
      .then(() => navigate("/admin/admins"))
      .catch((error) => console.error("Error updating admin:", error));
  };
  return (
    <AdminLayout>
      <div className="main-content">
        <h2 className="center">Update Admin</h2>
        <form className="update-form" onSubmit={handleSubmit}>
          <input type="text" name="cin" value={admin.cin} disabled />
          <input type="text" name="nom" placeholder="Nom" value={admin.nom} onChange={handleChange} />
          <input type="text" name="prenom" placeholder="Prénom" value={admin.prenom} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={admin.email} onChange={handleChange} />
          <input type="tel" name="telephone" placeholder="Téléphone" value={admin.telephone} onChange={handleChange} />
          <input type="text" name="adresse" placeholder="Adresse" value={admin.adresse} onChange={handleChange} />
          <input type="password" name="mdp" placeholder="New Password (Optional)" value={admin.mdp} onChange={handleChange} />
          <button type="submit">Update</button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminEditAdmin;
