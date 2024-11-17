const { WorkSpace } = require("../models/models");

exports.createWorkspace = async ({ studentID, branch, space }) => {
  const workspace = new WorkSpace({
    studentID,
    branch,
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
exports.getAllWorkspacesByStudentId = async (studentID, branch) => {
  return await WorkSpace.find({ studentID, branch }).sort({ createdAt: -1 });
};
