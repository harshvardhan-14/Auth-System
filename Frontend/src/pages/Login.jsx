import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import {login} from "../api/api";
import "../styles/Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setMsg("");

    try {
      const res = await login(form);
      setMsg(res.data.message || "Login successful");
    localStorage.setItem("token", res.data.token);

      //localStorage.setItem('role', res.data.role);
      navigate('/profile');
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2 className="title">Login</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input-field"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="input-field"
          />
          <button
            type="submit"
            disabled={loading}
            className={`button secondary ${loading ? 'disabled' : ''}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {msg && <p className={`message ${msg.includes("successful") ? 'success' : 'error'}`}>{msg}</p>}
        <p className="mt-4 text-center">
          Don’t have an account? <Link to="/signup" className="link">Signup here</Link>
        </p>
        <p className="mt-2 text-center">
          Forgot your password? <Link to="/request-reset" className="link">Reset here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;