import React, { useState } from "react";

function Analyse_job() {
  const [formData, setFormData] = useState({
    skills: "",
    experience: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const skillsArray = formData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "");

    try {
      const response = await fetch("http://localhost:3000/api/user/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skills: skillsArray,
          experience: Number(formData.experience),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server Error:", errorText);
        throw new Error("Server error occurred");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing jobs:", error);
      alert("Server error. Check if backend is running on port 3000!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white text-center py-3">
              <h4 className="mb-0">🚀 AI Job Analyzer</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Skills</label>
                  <input
                    type="text"
                    name="skills"
                    className="form-control"
                    placeholder="e.g. HTML, CSS, React"
                    value={formData.skills}
                    onChange={handleChange}
                    required
                  />
                  <small className="text-muted">
                    Comma (,) pottu skills-ai kudunga
                  </small>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    className="form-control"
                    placeholder="0"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-bold"
                  disabled={loading}
                >
                  {loading ? (
                    <span>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Analyzing...
                    </span>
                  ) : (
                    "Analyze My Profile"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Result Section */}
          {result && (
            <div className="mt-4 p-4 border rounded bg-white shadow-sm">
              <h5 className="text-success border-bottom pb-2 mb-3">
                Analysis Results
              </h5>

              <p>
                <strong>Your Current Level:</strong>{" "}
                <span className="badge bg-info text-dark ms-2">
                  {result.currentLevel}
                </span>
              </p>

              <div className="mt-3">
                <h6>🎯 Jobs You Can Apply:</h6>
                {result.jobsYouCanApply && result.jobsYouCanApply.length > 0 ? (
                  <div className="list-group mt-2">
                    {result.jobsYouCanApply.map((job, index) => (
                      <div
                        key={index}
                        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <span className="fw-bold text-primary">
                            {/* Backend key 'suggest_for_apply_job' inga map panniyachu */}
                            {job.suggest_for_apply_job || job.title}
                          </span>
                          <br />
                          <small className="text-muted">Level: {job.your_level}</small>
                        </div>
                        <span className="badge bg-success">Apply Now</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-danger small">
                    Match aagura jobs edhum illai. Skills-ai check pannunga.
                  </p>
                )}
              </div>

              <div className="mt-3">
                <h6>📚 What to learn next:</h6>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {result.nextLearn && result.nextLearn.length > 0 ? (
                    result.nextLearn.map((item, index) => (
                      <span
                        key={index}
                        className="badge bg-warning text-dark px-3 py-2"
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <p className="text-muted small">
                      Neenga ellam kathukitinga! 🚀
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analyse_job;