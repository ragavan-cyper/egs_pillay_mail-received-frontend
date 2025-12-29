import React, { useState } from "react";
import axios from "axios";
import "../create-admin/createadmin.css"

function Createadmin() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onchangeevent = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onsubmitevent = async (e) => {
    e.preventDefault();

    
    if (!data.name || !data.email || !data.password) {
      setError("All fields are required");
      setTimeout(() => setError(""), 2000);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3000/api/created/admin",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    
      setSuccess(res.data.message);
      setData({ name: "", email: "", password: "" });

      setTimeout(() => setSuccess(""), 2000);

    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
      }
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-12 col-sm-10 col-md-6 col-lg-4">

          
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <div className="card shadow p-4">
            <h4 className="text-center mb-4">Create Admin</h4>

            <form onSubmit={onsubmitevent} className="forms">

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={data.name}
                  onChange={onchangeevent}
                  placeholder="Enter admin name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={data.email}
                  onChange={onchangeevent}
                  placeholder="Enter admin email"
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={data.password}
                  onChange={onchangeevent}
                  placeholder="Create strong password"
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Create Admin
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Createadmin;
