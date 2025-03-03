const pinnedStudentService = require("../services/pinnedStudentService");

const addPinnedStudent = async (req, res) => {
  try {
    const { userId, studentId, userType } = req.body;
    const updatedUser = await pinnedStudentService.addPinnedStudent(userId, studentId, userType);
    res.status(200).json({ message: "Student pinned successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error pinning student", error });
  }
};

const removePinnedStudent = async (req, res) => {
  try {
    const { userId, studentId, userType } = req.body;
    const updatedUser = await pinnedStudentService.removePinnedStudent(userId, studentId, userType);
    res.status(200).json({ message: "Student unpinned successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error unpinning student", error });
  }
};

const getPinnedStudents = async (req, res) => {
  try {
    const { userId, userType } = req.params;
    const user = await pinnedStudentService.getPinnedStudents(userId, userType);
    res.status(200).json({ message: "Pinned students fetched successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching pinned students", error });
  }
};

module.exports = {
  addPinnedStudent,
  removePinnedStudent,
  getPinnedStudents,
};
