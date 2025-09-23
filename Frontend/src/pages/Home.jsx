// it will be my default page

import React from 'react'
import { Link } from "react-router-dom";
import "../styles/Home.css";


const Home = () => {
  return (
    
      <div className="home-container">
      <h2>Welcome to Auth System</h2>
      <p>Please signup or login to continue.</p>

      <div className="home-buttons">
        <Link to="/signup" className='btn'>Signup</Link>
        <Link to="/login" className='btn'>Login</Link>
      </div>
    </div>
  )
}

export default Home
