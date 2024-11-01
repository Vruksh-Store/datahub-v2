const { Student } = require("../models/models");
const bcrypt = require("bcrypt");

async function createStudent(studentData) {
  const saltRounds = 5;
  const hashedPassword = await bcrypt.hash(studentData.password, saltRounds);
  const newStudent = new Student({
    ...studentData,
    password: hashedPassword,
  });
  return await newStudent.save();
}

async function getStudents() {
  return await Student.find();
}

async function getIndividualStudent(id) {
  return await Student.findById(id);
}

async function loginStudents(name, password) {
  const student = await Student.findOne({ name });
  if (student && (await bcrypt.compare(password, student.password))) {
    return student;
  }
  return null;
}

async function resetPwd(phone, newPassword) {
  const saltRounds = 5;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  const updatedStudent = await Student.findOneAndUpdate(
    { phone },
    { password: hashedPassword },
    { new: true }
  );

  return updatedStudent;
}

async function feesUpdate(studentId, date, amount) {
  return await Student.findByIdAndUpdate(
    studentId,
    {
      $push: { fees: { date, amount, amountPaid: true } },
    },
    { new: true }
  );
}

async function studentUpdate(id, name, phone, level) {
  return await Student.findByIdAndUpdate(
    id,
    { name, phone, level },
    { new: true }
  );
}

async function studentDelete(id) {
  return await Student.findByIdAndDelete(id);
}

module.exports = {
  createStudent,
  getStudents,
  loginStudents,
  resetPwd,
  feesUpdate,
  studentUpdate,
  studentDelete,
  getIndividualStudent,
};
