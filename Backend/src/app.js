// configure Express , define API routes and middlewares

const express = require("express");
const app = express();
const cors = require("cors");



// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Auth System API is running...");
});

module.exports = app;
