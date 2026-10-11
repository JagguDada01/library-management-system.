import { Link } from "react-router-dom";

function AdminPage() {
  return (
    <div className="home-page">
      <div className="page-card">
        <h1>Admin Access</h1>
        <p>You are viewing a page restricted to administrators.</p>
        <Link to="/">Go back home</Link>
      </div>
    </div>
  );
}

export default AdminPage;
