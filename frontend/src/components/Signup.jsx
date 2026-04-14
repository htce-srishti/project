import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // const handleSignup = () => {
  //   if (!user.name || !user.email || !user.password) {
  //     alert("Please fill all fields!");
  //     return;
  //   }

  //   localStorage.setItem("user", JSON.stringify(user));
  //   alert("Signup Successful!");
  //   navigate("/login");
  // };


  const handleSignup = async () => {
    if (!user.name || !user.email || !user.password) {
      alert("Please fill all fields!");
      return;
    }

    const res = await fetch("http://127.0.0.1:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (data.message === "Signup successful") {
      alert("Signup Successful!");
      navigate("/login");
    } else {
      alert(data.message);
    }
  };


  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow p-4" style={{ width: "350px" }}>

        <h4 className="text-center mb-3">Create Account</h4>

        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            onChange={(e) =>
              setUser({ ...user, name: e.target.value })
            }
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
          />
        </div>

        {/* Button */}
        <button className="btn btn-success w-100" onClick={handleSignup}>
          Signup
        </button>

        {/* Footer */}
        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;