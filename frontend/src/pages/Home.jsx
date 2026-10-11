import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="home-page">
      <div className="page-card">
        <h1>Library Management System</h1>
        <p>Welcome, {user.name}!</p>
        <p>
          Role: {user.role === "admin" ? "Admin/Librarian" : "Student"}
        </p>
        {user.role === "admin" && (
          <p>
            <Link to="/admin">Open admin check page</Link>
          </p>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Home;
