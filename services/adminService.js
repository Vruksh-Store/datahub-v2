const { Admin, Staff, Student } = require("../models/models");
const bcrypt = require("bcrypt");

async function createAdmin(data) {
  const salt = await bcrypt.genSalt(5);
  data.password = await bcrypt.hash(data.password, salt);
  const admin = new Admin(data);
  return await admin.save();
}

async function createStaff(data) {
  console.log(data)
  const salt = await bcrypt.genSalt(5);
  data.password = await bcrypt.hash(data.password, salt);

  const staff = new Staff(data);
  return await staff.save();
}

async function updateStaff(staffId, data) {
  if (data.password) {
    const salt = await bcrypt.genSalt(5);
    data.password = await bcrypt.hash(data.password, salt);
  }

  return await Staff.findByIdAndUpdate(staffId, data, { new: true });
}

async function deleteStaff(staffId) {
  return await Staff.findByIdAndDelete(staffId);
}

async function getStaffs() {
  return await Staff.find().populate({
    path: "students",
    select: "_id registerNo name level",
  });
}

async function getStudents() {
  return await Student.find().select("_id registerNo name level");
}

async function addStudents(staffId, studentId) {
  return await Staff.findByIdAndUpdate(
    { _id: staffId },
    { $push: { students: studentId } },
    { new: true }
  );
}

async function removeStudents(staffId, studentId) {
  return await Staff.findByIdAndUpdate(
    { _id: staffId },
    { $pull: { students: studentId } },
    { new: true }
  );
}

module.exports = {
  createAdmin,
  createStaff,
  updateStaff,
  deleteStaff,
  getStaffs,
  getStudents,
  addStudents,
  removeStudents,
};
