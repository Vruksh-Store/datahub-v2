const { Admin, Staff } = require("../models/models");

const addPinnedStudent = async (userId, studentId, userType) => {
  const model = userType === "admin" ? Admin : Staff;
  const result = await model
    .findOneAndUpdate(
      { _id: userId },
      { $addToSet: { pinnedStudents: studentId } },
      { new: true }
    )
    .populate("pinnedStudents");
  console.log(result);
  return result;
};

const removePinnedStudent = async (userId, studentId, userType) => {
  const model = userType === "admin" ? Admin : Staff;
  return await model
    .findOneAndUpdate(
      { _id: userId },
      { $pull: { pinnedStudents: studentId } },
      { new: true }
    )
    .populate("pinnedStudents");
};

const getPinnedStudents = async (userId, userType) => {
  const model = userType === "admin" ? Admin : Staff;
  return await model.findById(userId).populate("pinnedStudents");
};

module.exports = {
  addPinnedStudent,
  removePinnedStudent,
  getPinnedStudents,
};
