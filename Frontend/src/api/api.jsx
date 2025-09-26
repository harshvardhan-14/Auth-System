
// creating an instance of axios with a base URL
import axios from 'axios';

const API  = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true // allows cookies
});



export const signup = (data) => API.post("/api/signup", data);
export const login = (data) => API.post("/api/login", data);
export const logout = () => API.post("/api/logout");
export const getprofile = () => API.get("/api/profile");

export const requestPasswordReset = (data) => API.post("/api/request-reset", data);
export const resetPassword = (data) => API.post("/api/reset-password", data);