import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const AdminEditClient = () => {
  const navigate = useNavigate();
  const { cin } = useParams();

  const [client, setClient] = useState({
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
      axios.get(`http://localhost:3000/auth/client/${cin}`)
        .then((res) => {
          const data = res.data.Result;
          setClient({
            cin,
            nom: data.nom || "",
            prenom: data.prenom || "",
            email: data.email || "",
            adresse: data.adresse || "",
            telephone: data.telephone || "",
            mdp: "",
          });
        })
        .catch((err) => console.error("Error fetching client data:", err));
    }
  }, [cin]);

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/auth/clientupdate", client)
      .then(() => navigate("/admin/clients"))
      .catch((error) => console.error("Error updating client:", error));
  };

  return (
    <AdminLayout>
      <div className="main-content">
        <h2 className="center">Update Client</h2>
        <form className="update-form" onSubmit={handleSubmit}>
          <input type="text" name="cin" value={client.cin} disabled />
          <input type="text" name="nom" placeholder="Nom" value={client.nom} onChange={handleChange} />
          <input type="text" name="prenom" placeholder="Prénom" value={client.prenom} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={client.email} onChange={handleChange} />
          <input type="tel" name="telephone" placeholder="Téléphone" value={client.telephone} onChange={handleChange} />
          <input type="text" name="adresse" placeholder="Adresse" value={client.adresse} onChange={handleChange} />
          <input type="password" name="mdp" placeholder="New Password (Optional)" value={client.mdp} onChange={handleChange} />
          <button type="submit">Update</button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminEditClient;
