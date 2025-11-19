const studentService = require("../services/student.service");

async function createStudent(req, res, next) {
    try {
        const data = req.body;

        if (!data || !data.name) {
            return res.status(400).json({
                success: false,
                message: "Name is required"
            });
        }

        const created = await studentService.createStudent(data);
        return res.status(201).json({ success: true, data: created });
    } catch (err) {
        next(err);
    }
}

async function listStudents(req, res, next) {
    try {
        const students = await studentService.getAllStudents(req.query);
        return res.status(200).json({
            success: true,
            results: students.length,
            data: students
        });
    } catch (err) {
        next(err);
    }
}

async function getStudent(req, res, next) {
    try {
        const { id } = req.params;
        const student = await studentService.getStudentById(id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({ success: true, data: student });
    } catch (err) {
        next(err);
    }
}

async function updateStudent(req, res, next) {
    try {
        const { id } = req.params;
        const updated = await studentService.updateStudent(id, req.body);

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({ success: true, data: updated });
    } catch (err) {
        next(err);
    }
}

async function deleteStudent(req, res, next) {
    try {
        const { id } = req.params;
        const deleted = await studentService.deleteStudent(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({ success: true, message: "Student deleted" });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createStudent,
    listStudents,
    getStudent,
    updateStudent,
    deleteStudent
};
