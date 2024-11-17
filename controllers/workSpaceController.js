const workspaceService = require("../services/workSpaceService");

// Create Workspace
exports.createWorkspace = async (req, res) => {
  try {
    const { studentID, branch, space } = req.body;
    const workspace = await workspaceService.createWorkspace({
      studentID,
      branch,
      space,
    });
    res.status(201).json(workspace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Workspace by ID
exports.getWorkspaceById = async (req, res) => {
  try {
    const workspace = await workspaceService.getWorkspaceById(req.params.id);
    if (!workspace)
      return res.status(404).json({ message: "Workspace not found" });
    res.json(workspace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Workspace by ID
exports.updateWorkspaceById = async (req, res) => {
  try {
    const workspace = await workspaceService.updateWorkspaceById(
      req.params.id,
      req.body
    );
    if (!workspace)
      return res.status(404).json({ message: "Workspace not found" });
    res.json(workspace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Workspace by ID
exports.deleteWorkspaceById = async (req, res) => {
  try {
    const result = await workspaceService.deleteWorkspaceById(req.params.id);
    if (!result)
      return res.status(404).json({ message: "Workspace not found" });
    res.json({ message: "Workspace deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Workspaces by studentID
exports.getAllWorkspacesByStudentId = async (req, res) => {
  try {
    const workspaces = await workspaceService.getAllWorkspacesByStudentId(
      req.params.studentID,
      req.params.branch
    );
    res.json(workspaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
