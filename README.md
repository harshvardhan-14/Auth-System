# 🔐 Auth System (MERN)

A role-based authentication system built with **MERN stack** (MongoDB, Express.js, React, Node.js).  
Supports **JWT authentication**, **cookie-based sessions**, **role-based access (user/admin)**, and **password reset via OTP**.

---

## 🚀 Features
- User Signup & Login (JWT + HttpOnly Cookies)
- Role-based access control:
  - **User** → Access profile
  - **Admin** → Manage users (`/admin/users`)
- Password reset with OTP (email integration ready)
- Protected routes (backend + frontend)
- MongoDB persistence (with Mongoose)

---

## 🛠 Tech Stack
- **Frontend:** React (Vite), React Router, Axios
- **Backend:** Node.js, Express.js, Mongoose, JWT, bcrypt
- **Database:** MongoDB
- **Other:** Nodemailer (for OTP), CORS, Cookie-Parser

---

## 📂 Project Structure

A1/
│── Backend/ # Express server + MongoDB models
│ ├── src/
│ │ ├── controllers/ # Auth logic
│ │ ├── routes/ # API endpoints
│ │ ├── models/ # User schema
│ │ └── utils/ # Helper functions (e.g. sendOtp , generateotp)
│ └── package.json
│
│── Frontend/ # React app (Vite)
│ ├── src/
│ │ ├── pages/ # Signup, Login, Profile, etc.
│ │ ├── api/ # Axios API calls
│ │ └── styles/ # CSS files
│ └── package.json
│
└── README.md


---

##  Installation & Setup

### 1️ Clone the repo
```bash
git clone https://github.com/harshvardhan-14/Auth-System
cd Auth-System 

```

###  Backend Setup

cd Backend
npm install

### create a .env file

PORT=
MONGO_URI=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=


### Frontend setup

cd Frontend
npm install
npm run dev

### Routes 

POST /api/signup → Register new user

POST /api/login → Login user

GET /api/profile → Get user profile (protected)

GET /api/admin/users → Get all users (admin only)

POST /api/request-reset → Request password reset (OTP)

POST /api/reset-password → Reset password


### Roles

User (default): Created via normal signup

Admin: Must be created manually (via DB or Postman) → not exposed in frontend signup form

### Author 

Harsh Vardhan
 Authentication System – 2025