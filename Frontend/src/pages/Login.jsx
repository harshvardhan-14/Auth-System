import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "../styles/Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Havent defiened this route yet
      const res = await api.post("/api/auth/login", form);
      alert(res.data.message || "Login successful");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>

      <p className="switch">
        Don’t have an account? <Link to="/signup">Signup here</Link>
      </p>
    </div>
  );
}

export default Login;
