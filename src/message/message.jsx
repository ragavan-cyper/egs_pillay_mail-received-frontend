import React, { useState } from "react";
import "../message/message.css";
import axios from "axios";

function Message() {

  const [data, setData] = useState({
    subject: "",
    message: ""
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onchangeevent = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onsubmitevent = async (e) => {
    e.preventDefault();

    
    if (!data.subject) {
      setError("SUBJECT FIELD REQUIRED");
      return setTimeout(() => setError(""), 2000);
    }

    if (!data.message) {
      setError("MESSAGE FIELD REQUIRED");
      return setTimeout(() => setError(""), 2000);
    }

    try {
     const token = localStorage.getItem("token");

await axios.post(
  "http://localhost:3000/api/admin/msg",
  data,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);


      setSuccess("MESSAGE SENT TO ALL STUDENTS ✅");
      setData({ subject: "", message: "" });

      setTimeout(() => setSuccess(""), 2000);

    } catch (err) {
      setError("MAIL SENDING FAILED ❌");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <>
    
      <div className="msg-wrapper">
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
      </div>

      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center message-bg">
        <div className="row w-100 justify-content-center">
          <div className="col-12">
            <div className="card shadow-lg mx-auto message-card">

              <div className="card-header text-white message-header">
                📧 Send Message to Students
              </div>

              <div className="card-body p-4">
                
                
                <form onSubmit={onsubmitevent}>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Subject</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="subject"
                      value={data.subject}
                      onChange={onchangeevent}
                      placeholder="Enter subject"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Message</label>
                    <textarea
                      className="form-control"
                      rows="7"
                      name="message"
                      value={data.message}
                      onChange={onchangeevent}
                      placeholder="Type message..."
                    />
                  </div>

                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-send px-5 py-2">
                      <i className="bi bi-send-fill me-2"></i>
                      Send
                    </button>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Message;
