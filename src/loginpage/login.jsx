import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../loginpage/login.css";
import axios from "axios";

function Login() {
  const navigate = useNavigate(); 
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const updateevent = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitevent = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      setError("ALL FIELDS REQUIRED");
      setTimeout(() => setError(""), 2000);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/login",
        data,
        { withCredentials: true }
      );

    
      if (res.status === 200) {
        setSuccess(res.data.message);

        
        localStorage.setItem("token", res.data.token);

        setTimeout(() => {
          setSuccess("");
          navigate("/homepage");
        }, 1000);
      }

    } catch (err) {
      if (err.response?.status === 401) {
        setError("ACCOUNT NOT FOUND");
      } else if (err.response?.status === 400) {
        setError("Email or Password Incorrect");
      } else {
        setError("Server Error");
      }

      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div className="loginpage">
      
      <div className="msg-wrapper">
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
      </div>

      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-12 col-sm-10 col-md-6 col-lg-4">

            <form className="border p-4 rounded shadow" onSubmit={submitevent}>
              <h4 className="text-center mb-4">Login</h4>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={data.email}
                  onChange={updateevent}
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={data.password}
                  onChange={updateevent}
                  placeholder="Enter your password"
                />
              </div>

            
              <button className="btn btn-primary w-100" type="submit">
                Log In
              </button>

              <Link to="/signup">
                <p className="text-center mt-3 mb-0">
                  Don’t have an account? Signup
                </p>
              </Link>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
