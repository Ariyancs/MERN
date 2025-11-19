const express = require("express");
const app = express();

const studentRouter = require("./routes/student.router");
const errorHandler = require("./middlewares/error.middleware");

app.use(express.json());

app.use("/api/students", studentRouter);

app.use(errorHandler);

module.exports = app;
