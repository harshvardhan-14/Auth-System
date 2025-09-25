// configure Express , define API routes and middlewares

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cookieParser());



// Middlewares
app.use(cors(
{  origin: "http://localhost:5173", // frontend URL
    credentials: true,  }
));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Auth System API is running...");
});

// routes
app.use('/api', require('./routes/authRoutes'));

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

module.exports = app;
