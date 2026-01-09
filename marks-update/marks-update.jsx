import React, { useState } from "react";
import axios from "axios";

function Marks_update() {
  const [formData, setFormData] = useState({
    name: "",
    reg_num: "",
    subject_code: "",
    subject_name: "",
    semester: "",
    cat: "",
    marks: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        !formData.name ||
        !formData.reg_num ||
        !formData.subject_code ||
        !formData.subject_name ||
        !formData.semester ||
        !formData.cat ||
        formData.marks === ""
      ) {
        setError("ALL FIELDS REQUIRED");

        setTimeout(() => {
          setError("");
        }, 2000);
        return;
      }

      const res = await axios.post(
        "http://localhost:3000/api/user/marks/update",
        formData
      );

      if (res.status === 201) {
        setSuccess("MARKS-UPDATE");
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      }
      formData("");
    } catch (error) {
      if (error.response?.status === 500) {
        setError("server crash");
        setTimeout(() => {
          setError("");
        }, 2000);
        return;
      }
      if (error.response?.status === 401) {
        setError("same reg.num course name internal mark already update");
        setTimeout(()=>{
            setError("")
        },2000)
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header text-center bg-primary text-white">
              <h5>Marks Update Form</h5>
            </div>

            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">Student Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Register Number */}
                <div className="mb-3">
                  <label className="form-label">Register Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="reg_num"
                    value={formData.reg_num}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Subject Code */}
                <div className="mb-3">
                  <label className="form-label">Subject Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subject_code"
                    value={formData.subject_code}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Subject Name */}
                <div className="mb-3">
                  <label className="form-label">Subject Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subject_name"
                    value={formData.subject_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Semester */}
                <div className="mb-3">
                  <label className="form-label">Semester</label>
                  <select
                    className="form-select"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Semester</option>
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                    <option value="3">Semester 3</option>
                    <option value="4">Semester 4</option>
                    <option value="5">Semester 5</option>
                    <option value="6">Semester 6</option>
                    <option value="7">Semester 7</option>
                    <option value="8">Semester 8</option>
                  </select>
                </div>

                {/* CAT */}
                <div className="mb-3">
                  <label className="form-label">CAT</label>
                  <select
                    className="form-select"
                    name="cat"
                    value={formData.cat}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select CAT</option>
                    <option value="CAT 1">CAT 1</option>
                    <option value="CAT 2">CAT 2</option>
                    <option value="CAT 3">CAT 3</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Internal Marks</label>
                  <input
                    type="number"
                    className="form-control"
                    name="marks"
                    value={formData.marks}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-success">
                    Update Marks
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Marks_update;
