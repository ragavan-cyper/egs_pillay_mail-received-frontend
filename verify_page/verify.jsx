import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../verify_page/verify.css"
function Verify() {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load data from Signup page
  useEffect(() => {
    if (!location.state) {
      navigate("/signup");
    } else {
      setData((prev) => ({
        ...prev,
        name: location.state.name,
        email: location.state.email,
        password: location.state.password,
      }));
    }
  }, [location.state, navigate]);

  const onchangeevent = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const verifyevent = async (e) => {
    e.preventDefault();

    if (!data.otp) {
      setError("OTP IS REQUIRED");
      setTimeout(() => setError(""), 2000);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/verify",
        data,
        { withCredentials: true }
      );

      if (res.status === 201) {
        setSuccess("OTP VERIFIED SUCCESSFULLY");

        setTimeout(() => {
          navigate("/homepage");
        }, 1500);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setError("INVALID OTP");
      } else if (error.response?.status === 410) {
        setError("OTP EXPIRED");
      } else {
        setError("VERIFICATION FAILED");
      }

      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div className="container">
      <div className="msg-wrapper">
        {error && (
          <div className="alert alert-danger fade-in msg-box">{error}</div>
        )}
        {success && (
          <div className="alert alert-success fade-in msg-box">{success}</div>
        )}
      </div>

      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          <form className="card p-4 shadow rounded-4" onSubmit={verifyevent}>
            <h4 className="text-center mb-4">OTP Verification</h4>

            <div className="mb-3">
              <label className="form-label">Enter OTP</label>
              <input
                type="text"
                className="form-control"
                placeholder="6-digit OTP"
                name="otp"
                value={data.otp}
                onChange={onchangeevent}
              />
            </div>

            <button className="btn btn-success w-100">Verify OTP</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Verify;
