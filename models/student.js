const mongoose = require("mongoose");
const studentSchema = require("./studentSchema");

//creating model of that schema
const Student = mongoose.model("student", studentSchema);

module.exports = Student;
