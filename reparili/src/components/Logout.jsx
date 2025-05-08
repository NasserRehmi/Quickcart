import { useNavigate } from "react-router-dom";
import axios from "axios";

function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("valid");
    localStorage.removeItem("token");
    localStorage.removeItem("cin");
    axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true })
      .then(() => console.log("Logged out successfully"))
      .catch((err) => console.error("Logout error:", err));
    navigate("/login");
  };
  return (
    <div className="logout-container">
      <h2>Are you sure you want to log out?</h2>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
}
export default Logout;