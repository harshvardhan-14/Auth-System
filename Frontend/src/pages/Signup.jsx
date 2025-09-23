import React , {useState} from 'react'
import api from "../api/api";
import {Link} from "react-router-dom"
import "../styles/Signup.css";

const Signup = () => {

 const [form , setForm] = useState({name :"", email:"",password:""});

 const handlechange =(e)=>{
 setForm({...form, [e.target.name]: e.target.value})
 };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // I haven't defined this route yet
      const res = await api.post("/api/auth/signup", form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };


  return (
    <div className='signup-container'>
      <h2>Signup page</h2>

    <form onSubmit={handleSubmit} className='signup-form'>
    <input name='name' placeholder='Name' onChange={handlechange}/>
    <input name='email' type='email' placeholder='Email' onChange={handlechange}/>
    <input name='password' type='Password' placeholder='Password' onChange={handlechange}/>
    <button type ="submit">Signup </button>
    </form>
  
  <p className="switch">
        Already have an account? <Link to="/login">Login here</Link>
      </p>

    </div>
  )
}

export default Signup
