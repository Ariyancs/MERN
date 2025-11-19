const express = require("express");
const app = express();
const cors = require("cors");

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
const authRouter = require("./routes/auth.router");
app.use("/api/auth", authRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Auth API Running...");
});

module.exports = app;
