import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import {getprofile , logout} from "../api/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await getprofile();
      setProfile(res.data.user);
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to fetch profile");
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('role');
      navigate('/');
    } catch (err) {
      setMsg("Logout failed");
    }
  };

  React.useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="page-container">
      <div className="card large">
        <h2 className="title">User Profile</h2>
        {profile ? (
          <div>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role}</p>
            <div className="button-group mt-4">
              <button
                onClick={handleLogout}
                className="button danger"
              >
                Logout
              </button>
              {profile.role === 'admin' && (
                <Link to="/admin/users" className="button primary">
                  Admin Panel
                </Link>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center">{msg || "Loading profile..."}</p>
        )}
      </div>
    </div>
  );
};

export default Profile;