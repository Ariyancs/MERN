const students = [{ id:1, name:'Ariyan Bhakat', age:22, course:'ECE' }];
function getAllStudents(){ return students; }
function getStudentById(id){ return students.find(s=>s.id===id) || null; }
module.exports = { getAllStudents, getStudentById };
