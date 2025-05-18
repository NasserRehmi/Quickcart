import { useState, useEffect } from "react";
import axios from "axios";
import { Link ,useNavigate } from "react-router-dom";
import CsLayout from './CsLayout';
const BuilderList = () => {
  const navigate = useNavigate();
  const [builders, setBuilders] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/builderslts")
      .then((result) => {
        if (result.data.Status) {
          setBuilders(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <CsLayout>
    <div className="login-page">
    <div className="builders-container"> <div  className="top-button-container"><button
        className="view-top-button"
        onClick={() => navigate('/topbuilders')}
      >
        View Top Builders
      </button></div>
  <h2 className="section-title">Available Builders</h2>
 
  <div className="builder-list">
    {builders.map((builder) => (
      <div key={builder.cin} className="builder-card">
        <div className="builder-image-container">
          <img
            src={
              builder.image
                ? `http://localhost:3000/public/images/${builder.image}`
                : "https://via.placeholder.com/150"
            }
            alt={`${builder.nom} ${builder.prenom}`}
            className="builder-image"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150";
              e.target.className = "builder-image placeholder";
            }}
          />
        </div>
        <div className="builder-content">
          <div className="builder-header">
            <h3 className="builder-name">
              {builder.nom} {builder.prenom}
            </h3>
            <div className="builder-rating">
              <span className="stars">travaille : </span>
              <span>{builder.done_work_count }</span>
            </div>
          </div>

          <div className="builder-actions">
            <Link 
              to={`/builders/builderprofile/${builder.cin}`}
              className="profile-link"
            >
              View Profile →
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
    </div>
    </CsLayout>
  );}
export default BuilderList;