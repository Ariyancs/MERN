const Student = require("../models/student.model");

async function createStudent(payload) {
    const student = new Student(payload);
    return await student.save();
}

async function getAllStudents(query = {}) {
    const { search, limit = 20, skip = 0, sort = '-createdAt' } = query;
    const filter = {};
    if (search) {
        filter.name = new RegExp(search, 'i');
    }
    return await Student.find(filter)
        .sort(sort)
        .limit(Number(limit))
        .skip(Number(skip))
        .lean();
}

async function getStudentById(id) {
    return await Student.findById(id).lean();
}

async function updateStudent(id, payload) {
    return await Student.findByIdAndUpdate(id, payload, { new: true, runValidators: true }).lean();
}

async function deleteStudent(id) {
    return await Student.findByIdAndDelete(id).lean();
}

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};
