import React, { useState } from "react";
import axios from "axios";
import "../signuppage/signup.css";
import {  useNavigate } from "react-router-dom";

function Signup() {
  const navigate=useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onchangeevent = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };
  const submitevent = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password) {
      setError("ALL FIELDS REQUIRED");
      setTimeout(() => {
        setError("");
      }, 2000);
      return
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/signup",
        data,
        {
          withCredentials: true,
        }
      );
      if(res.status===201){
             setSuccess("OTP SENT");
      setTimeout(() => {
       navigate("/verify",{state:{
        name:data.name,
        email:data.email,
        password:data.password
       }})
      }, 2000);
      }
     
    } catch (error) {
      if (error.response?.status === 404) {
        setError("EMAIL ID ALREADY USED");
        setTimeout(() => {
          setError("");
        }, 2000);
        return
      }
      if (error.response?.status === 500) {
        setError("server crash");
        setTimeout(() => {
          setError("");
        }, 2000);
        return
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="msg-wrapper">
          {error && (
            <div className="alert alert-danger fade-in msg-box danger">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success fade-in msg-box success ">
              {success}
            </div>
          )}
        </div>
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-12 col-sm-10 col-md-6 col-lg-4">
            <form
              className="card p-4 shadow rounded-4 form"
              onSubmit={submitevent}
            >
              <h4 className="text-center mb-4">Signup</h4>

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  name="name"
                  value={data.name}
                  onChange={onchangeevent}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  name="email"
                  value={data.email}
                  onChange={onchangeevent}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  name="password"
                  value={data.password}
                  onChange={onchangeevent}
                />
              </div>

              <button className="btn btn-primary w-100">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
