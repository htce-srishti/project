import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    });

    const data = await res.json();

    if (data.message === "Login successful") {
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Login Successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow p-4" style={{ width: "350px" }}>

        <h4 className="text-center mb-3">Login</h4>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) =>
              setLogin({ ...login, email: e.target.value })
            }
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <div className="d-flex justify-content-between">
            <label className="form-label">Password</label>
            <small className="text-primary" style={{ cursor: "pointer" }}>
              Forgot Password?
            </small>
          </div>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) =>
              setLogin({ ...login, password: e.target.value })
            }
          />
        </div>

        {/* Remember me */}
        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" />
          <label className="form-check-label">Remember Me</label>
        </div>

        {/* Button */}
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>

        {/* Footer */}
        <p className="text-center mt-3 mb-0">
          Don't have an account?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            signup
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;