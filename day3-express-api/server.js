const express = require("express");
const app = express();
const PORT = 3000;

// Built-in middleware
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} ${req.originalUrl} - Body: ${JSON.stringify(req.body)}`
  );
  next();
});

// In-memory "database"
let students = [
  { id: 1, name: "Ariyan Bhakat", age: 22, course: "ECE" },
  { id: 2, name: "Riya Sen", age: 21, course: "CSE" }
];

// Generate next ID
function nextId() {
  return students.length ? Math.max(...students.map((s) => s.id)) + 1 : 1;
}

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Student Management API Working" });
});

// GET all students
app.get("/students", (req, res) => {
  res.status(200).json({ students });
});

// GET a single student
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.status(200).json({ student });
});

// POST new student
app.post("/students", (req, res) => {
  const { name, age, course } = req.body;

  if (!name || !age || !course) {
    return res
      .status(400)
      .json({ error: "Missing required fields: name, age, course" });
  }

  const newStudent = {
    id: nextId(),
    name,
    age,
    course
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student created",
    student: newStudent
  });
});

// PUT update student
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const studentIndex = students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  const { name, age, course } = req.body;

  // Update fields only if provided
  students[studentIndex] = {
    ...students[studentIndex],
    ...(name && { name }),
    ...(age && { age }),
    ...(course && { course })
  };

  res.status(200).json({
    message: "Student updated",
    student: students[studentIndex]
  });
});

// DELETE student
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  const removed = students.splice(index, 1)[0];

  res.status(200).json({
    message: "Student deleted",
    student: removed
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});