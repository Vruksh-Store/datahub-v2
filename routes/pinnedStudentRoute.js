const express = require("express");
const router = express.Router();
const pinnedStudentController = require("../controllers/pinnedStudentController");

router.post("/add", pinnedStudentController.addPinnedStudent);
router.post("/remove", pinnedStudentController.removePinnedStudent);
router.get("/:userId/:userType", pinnedStudentController.getPinnedStudents);

module.exports = router;
