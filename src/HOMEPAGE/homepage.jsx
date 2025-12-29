import React from "react";
import "../HOMEPAGE/homepage.css";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Homepage() {
  let user = null;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token) {
    user = jwtDecode(token);
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row min-vh-100">
          <div className="col-12 col-md-4 col-lg-3 sidebar p-0">
            <h5 className="text-white text-center py-4">Dashboard</h5>

            <ul className="nav flex-column px-3">
              <li className="nav-item">
                <a className="nav-link">🏠 Home</a>
              </li>

              <li className="nav-item">
                <a className="nav-link">📊 Marks</a>
              </li>

              <li className="nav-item">
                <a className="nav-link">📢 Notices</a>
              </li>

              {(user?.role === "admin" || user?.role === "superadmin") && (
                <li className="nav-item">
                  <Link
                    to="/message"
                    className="links d-flex align-items-center gap-2"
                  >
                    <i className="bi bi-envelope-arrow-up-fill"></i>
                    <span>MESSAGE</span>
                  </Link>
                </li>
              )}

              {user?.role === "superadmin" && (
                <li className="nav-item">
                  <Link
                    to="/createadmin"
                    className="links d-flex align-items-center gap-2"
                  >
                    <i className="bi bi-envelope-arrow-up-fill"></i>
                    <span>CREATE-ADMIN</span>
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <button onClick={logout} className="nav-link btn text-start">
                  🚪 Logout
                </button>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-8 col-lg-9 content">
            <h2>Welcome 👋</h2>
            <p>Here you can see your marks and notices.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
