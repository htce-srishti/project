import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center">
        {/* Heading */}
        <h1 className="mt-4 fw-bold">Welcome to indixpert</h1>
        <p className="text-muted">
          Manage your account easily with a clean dashboard
        </p>

        {/* Buttons */}
        <div className="mt-4">
          <Link to="/login" className="btn btn-primary px-4 me-3">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success px-4">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;