import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideLayout from "./SideLayout";
const UpdateBuilder = () => {
    const navigate = useNavigate();
    const [builder, setBuilder] = useState({
        cin: "", 
        adresse: "",
        email:"",
        telephone: "",
        mdp: "", 
    });
    useEffect(() => {
        const storedCin = localStorage.getItem("cin");
        if (storedCin) {
            setBuilder((prev) => ({ ...prev, cin: storedCin }));
        }
    }, []);
    const handleChange = (e) => {
        setBuilder({ ...builder, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        const storedCin = localStorage.getItem("cin");
        e.preventDefault();
        axios.post("http://localhost:3000/auth/builderupdate", builder)
            .then(() => navigate(`/builder/details/${storedCin}`))
            .catch((error) => console.error("Error updating builder:", error));
    };
    return (
        <SideLayout>
        <div className="client-page">
            <h2>Update Builder</h2>
           <form className="update-form" onSubmit={handleSubmit}>
  <input type="text" name="cin" value={builder.cin} disabled />
  <input type="tel" name="telephone" placeholder="Téléphone" value={builder.telephone} onChange={handleChange}/>
  <input type="email" name="email" placeholder="email" value={builder.email} onChange={handleChange}/>
  <input type="text" name="adresse" placeholder="Adresse" value={builder.adresse} onChange={handleChange}/>
  <input type="password" name="mdp" placeholder="New Password (Optional)" value={builder.mdp} onChange={handleChange} />

  <button type="submit">Update</button>
</form>

        </div>
        </SideLayout>
    );
};

export default UpdateBuilder;
