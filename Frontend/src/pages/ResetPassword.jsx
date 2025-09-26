import React ,{ useState } from "react";
import { resetPassword } from "../api/api";
import "../styles/resetpassword.css";

const ResetPassword = () => {
  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [msg, setMsg] = useState("");

  // eslint-disable-next-line
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword(form);
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="otp" placeholder="OTP" onChange={handleChange} />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        <button type="submit">Reset Password</button>
      </form>
      <p>{msg}</p>
    </div>
  );
};

export default ResetPassword;
