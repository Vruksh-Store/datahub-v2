const express = require("express");
const router = express.Router();
const workSpaceController = require("../controllers/workspaceController.js");

// Create a new workspace
router.post("/create", workSpaceController.createWorkspace);

// Get workspace by ID
router.get("/:id", workSpaceController.getWorkspaceById);

// Update workspace by ID
router.put("/:id", workSpaceController.updateWorkspaceById);

// Delete workspace by ID
router.delete("/:id", workSpaceController.deleteWorkspaceById);

// Get all workspaces by studentID
router.get(
  "/student/:studentID",
  workSpaceController.getAllWorkspacesByStudentId
);

module.exports = router;
