import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  // ✅ Image Upload (FIXED)
  const handleImageUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // ✅ SAVE PROFILE (BACKEND CALL 🔥)
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("name", user.name);

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    const res = await fetch("http://127.0.0.1:8000/update-profile", {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();

    if (data.user) {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Profile Updated ✅");
      setEditMode(false);
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="bg-light vh-100">
      
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand">Dashboard</span>
        <button className="btn btn-outline-light" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="container mt-5">

        <div className="card shadow p-4 text-center mx-auto" style={{ maxWidth: "400px" }}>
          
          {/* Image */}
          <img
            src={user.image || "https://via.placeholder.com/120"}
            alt="profile"
            className="rounded-circle mb-3"
            style={{ width: "120px", height: "120px", objectFit: "cover", margin:"auto" }}
          />

          <input
            type="file"
            className="form-control mb-3"
            onChange={handleImageUpload}
          />

          {/* Name */}
          {editMode ? (
            <input
              type="text"
              className="form-control mb-2"
              value={user.name}
              onChange={(e) =>
                setUser({ ...user, name: e.target.value })
              }
            />
          ) : (
            <h4>{user.name}</h4>
          )}

          {/* Email */}
          {editMode ? (
            <input
              type="email"
              className="form-control mb-2"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
            />
          ) : (
            <p className="text-muted">{user.email}</p>
          )}

          <hr />

          {/* Buttons */}
          {editMode ? (
            <button className="btn btn-success w-100 mb-2" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button
              className="btn btn-primary w-100 mb-2"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          )}

          <button className="btn btn-danger w-100" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;