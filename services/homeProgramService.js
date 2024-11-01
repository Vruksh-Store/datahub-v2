const { HomeProgram } = require("../models/models");

async function createHomeProgram(data) {
  const homeProgram = new HomeProgram(data);
  return await homeProgram.save();
}

async function getAllHomePrograms() {
  return await HomeProgram.find();
}

async function getSpecificProgram(id) {
  return await HomeProgram.findById(id);
}

async function getHomeProgramsByStudent(studentId) {
  return await HomeProgram.find({ studentReference: studentId });
}

async function updateHomeProgram(id, data) {
  return await HomeProgram.findByIdAndUpdate(id, data, { new: true });
}

async function deleteHomeProgram(id) {
  return await HomeProgram.findByIdAndDelete(id);
}

module.exports = {
  createHomeProgram,
  getAllHomePrograms,
  getHomeProgramsByStudent,
  updateHomeProgram,
  deleteHomeProgram,
  getSpecificProgram,
};
