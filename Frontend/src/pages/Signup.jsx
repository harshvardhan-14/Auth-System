import React , {useState} from 'react'
import {signup} from "../api/api";
import {Link , useNavigate} from "react-router-dom"
import "../styles/Signup.css";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      const res = await signup(form);
      setMsg(res.data.message || "Signup successful");
      setForm({ name: "", email: "", password: "" });
      navigate('/login');
    } catch (err) {
      setMsg(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='signup-container'>
      <h2>Signup page</h2>

      <form onSubmit={handleSubmit} className='signup-form'>
        <input name='name' placeholder='Name' onChange={handleChange} />
        <input name='email' type='email' placeholder='Email' onChange={handleChange} />
        <input name='password' type='Password' placeholder='Password' onChange={handleChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
      {msg && <p className="message">{msg}</p>}

      <p className="switch">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Signup;

