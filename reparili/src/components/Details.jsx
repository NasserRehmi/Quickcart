import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import SideLayout from "./SideLayout";
const Details = () => {
  const { cin } = useParams(); 
  const [builder, setBuilder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`http://localhost:3000/auth/builder/details/${cin}`)
      .then((response) => {
        if (response.data.Status && response.data.Result.length > 0) {
          setBuilder(response.data.Result[0]); 
        } else {
          setError("No builder found with this CIN.");
        }
      })
      .catch(() => {
        setError("An error occurred while fetching builder details.");
      })
      .finally(() => setLoading(false)); 
  }, [cin]);

  if (loading) return <div className="details-container">Loading...</div>;
  if (error) return <div className="details-container">{error}</div>;

  return (
    <SideLayout><div className="client-page">
    <div className="details-container">
  <h2>Builder Details</h2>
  {builder.image ? (
    <img
      src={`http://localhost:3000/public/images/${builder.image}`}
      alt="Builder"
      className="builder-image"
    />
  ) : (
    <p className="no-image">No image available</p>
  )}
  <div className="builder-info">
    <p><strong>Name:</strong> {builder.nom} {builder.prenom}</p>
    <p><strong>CIN:</strong> {builder.cin}</p>
    <p>
      <strong>Email:</strong>{" "}
      <a href={`mailto:${builder.email}`} className="builder-link">{builder.email}</a>
    </p>
    <p>
      <strong>Phone:</strong>{" "}
      <a href={`https://wa.me/${builder.telephone}`} target="_blank" rel="noopener noreferrer" className="builder-link">
        {builder.telephone}
      </a>
    </p>
    <p><strong>Address:</strong> {builder.adresse}</p>
  </div>

  <Link to="/updatebuilder" className="cta-button">
    Update
  </Link>
</div></div>
</SideLayout>
  );
};

export default Details;
