import React, { useState } from "react";
import axios from "axios";

function Marks_get() {
  const [regNum, setRegNum] = useState("");
  const [marks, setMarks] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!regNum) {
      setError("REGISTER NUMBER REQUIRED");
      setTimeout(() => setError(""), 2000);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:3000/api/user/mark/show?reg_num=${regNum}`
      );

      if (res.status === 200) {
        setMarks(res.data.data);
        setError("");
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError("NO MARKS FOUND");
      } else {
        setError("SERVER ERROR");
      }
      setMarks([]);
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h5>Get Student Marks</h5>
            </div>

            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Register Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={regNum}
                    onChange={(e) => setRegNum(e.target.value)}
                    placeholder="Enter Register Number"
                  />
                </div>

                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-success">
                    Get Marks
                  </button>
                </div>
              </form>

              {/* Marks Display */}
              {marks.length > 0 && (
                <table className="table table-bordered mt-3">
                  <thead className="table-dark">
                    <tr>
                      <th>Subject Code</th>
                      <th>Subject Name</th>
                      <th>Semester</th>
                      <th>CAT</th>
                      <th>Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marks.map((m, index) => (
                      <tr key={index}>
                        <td>{m.subject_code}</td>
                        <td>{m.subject_name}</td>
                        <td>{m.semester}</td>
                        <td>{m.cat}</td>
                        <td>{m.internal_marks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Marks_get;
