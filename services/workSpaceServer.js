const { WorkSpace } = require("../models/models");

exports.createWorkspace = async ({ studentID, space }) => {
  const workspace = new WorkSpace({
    studentID,
    space,
  });
  return await workspace.save();
};

// Get Workspace by ID
exports.getWorkspaceById = async (id) => {
  return await WorkSpace.findById(id).populate("studentID");
};

// Update Workspace by ID
exports.updateWorkspaceById = async (id, data) => {
  return await WorkSpace.findByIdAndUpdate(id, data, { new: true });
};

// Delete Workspace by ID
exports.deleteWorkspaceById = async (id) => {
  return await WorkSpace.findByIdAndDelete(id);
};

// Get All Workspaces by studentID
exports.getAllWorkspacesByStudentId = async (studentID) => {
  return await WorkSpace.find({ studentID }).sort({ createdAt: -1 });
};
