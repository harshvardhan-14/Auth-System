import React , {useState} from 'react';
import { Link } from "react-router-dom";
import { requestPasswordReset } from "../api/api";
import "../styles/requestreset.css";

const RequestReset = () => {

    const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await requestPasswordReset({ email });
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };


  return (
     <div className="reset-container">
      <h2>Request Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send OTP</button>
      </form>
      <p>{msg}</p>

      <p className="switch">
                Got your otp?Reset your password? <Link to="/reset-password" className="link">Reset here</Link>
              </p>
    </div>
  )
}

export default RequestReset
