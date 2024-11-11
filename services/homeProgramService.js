const { HomeProgram } = require("../models/models");

async function createHomeProgram(data) {
  console.log(data);
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
  const updatedHomeProgram = await HomeProgram.findByIdAndUpdate(
    id,
    { $set: { exercises: data } },
    { new: true }
  );

  return updatedHomeProgram;
}

async function updateHomeProgramReview(id, data) {
  const updatedHomeProgram = await HomeProgram.findByIdAndUpdate(
    id,
    { review: data },
    { new: true }
  );

  return updatedHomeProgram;
}

async function deleteHomeProgram(id) {
  return await HomeProgram.findByIdAndDelete(id);
}

module.exports = {
  createHomeProgram,
  getAllHomePrograms,
  getHomeProgramsByStudent,
  updateHomeProgram,
  updateHomeProgramReview,
  deleteHomeProgram,
  getSpecificProgram,
};
