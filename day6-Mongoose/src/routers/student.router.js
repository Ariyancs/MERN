const express = require("express");
const router = express.Router();

const studentController = require("../controllers/student.controller");
const validateObjectId = require("../middlewares/validateObjectId.middleware");

router.post("/", studentController.createStudent);
router.get("/", studentController.listStudents);
router.get("/:id", validateObjectId, studentController.getStudent);
router.put("/:id", validateObjectId, studentController.updateStudent);
router.delete("/:id", validateObjectId, studentController.deleteStudent);

module.exports = router;
