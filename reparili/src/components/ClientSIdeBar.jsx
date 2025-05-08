import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const ClientSidebar = () => {
    const navigate = useNavigate();
    const cin = localStorage.getItem('cin');

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
    
        if (confirmLogout) {
          localStorage.removeItem("valid");
          localStorage.removeItem("token");
          localStorage.removeItem("cin");
          axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true })
            .then(() => console.log("Logged out successfully"))
            .catch((err) => console.error("Logout error:", err));
          navigate("/login");
        }
      };
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Client Dashboard</h2>
            <nav className="sidebar-nav">
              <ul>
              <li><Link to="/builders" className="sidebar-link">🔨 Builders</Link></li>
              <li><Link to="/reclamation" className="sidebar-link">📋 Reclamation</Link></li>
              <li><Link to={`/clientwork/${cin}`}  className="sidebar-link">📋 Your Work</Link></li>
              <li><button onClick={handleLogout} className="sidebar-button">🚪 Logout</button></li>
                </ul>
                </nav>
        </div>
    );
};

export default ClientSidebar;
