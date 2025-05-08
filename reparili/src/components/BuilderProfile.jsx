import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CsLayout from "./CsLayout";
const BuilderProfile = () => {
  const { cin } = useParams();
  const [builder, setBuilder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/auth/builderslts?cin=${cin}`)
      .then((response) => {
        console.log("API Response:", response.data); 
        if (response.data.Status && response.data.Result) {
          setBuilder(response.data.Result); 
        } else {
          setError("Builder not found.");
        }
      })
      .catch((error) => {
        console.log("Error fetching builder:", error);
        setError("An error occurred while fetching the builder.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cin]);
  if (loading) {
    return <div>Loading...</div>;  
  }
  if (error) {
    return <div>{error}</div>;  
  }
  return (
    <CsLayout>
      <div className="client-page">
        <div className="add-card">
          <h2>{builder?.nom} {builder?.prenom}</h2>
          <p></p>
          <img
            className="builder-image"
            src={builder?.image ? `http://localhost:3000/public/images/${builder.image}` : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP8AAECAwQFBgc="}
            alt={builder?.nom || "Builder"}
          />
          <p></p>
          <p>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${builder?.email}`}>
              {builder?.email}
            </a>
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            <a href={`https://wa.me/${builder?.telephone}`} target="_blank" rel="noopener noreferrer">
              {builder?.telephone}
            </a>
          </p>

          <p><strong>Done Work:</strong> {builder?.done_work_count }</p> 
          <p>
            <Link to={`/request/${cin}`} className="link">
              Deal with
            </Link>
          </p>
        </div>
      </div>
    </CsLayout>
  );
};
export default BuilderProfile;
