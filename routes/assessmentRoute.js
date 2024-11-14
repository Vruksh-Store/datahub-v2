const express = require("express");
const assessmentController = require("../controllers/assessmentController");
const setAssessmentModel = require("../middlewares/setAssessmentModel");
const checkIfExist = require("../middlewares/checkToken");

const router = express.Router();

router.get(
  "/all/get/c/get-different-assessments",
  assessmentController.getDifferentAssessments
);
// router.use(checkIfExist, setAssessmentModel);
// need to change the above one ❌❌❌❌ during production and testing
router.use(setAssessmentModel);

// POST request
router.post("/:model", assessmentController.createAssessment);

// GET requests
router.get("/student/:studentId", assessmentController.getAssessments);

router.get("/:model/:id", assessmentController.getAssessment);
router.get("/latest/:model/:id", assessmentController.getLatestAssessment);

// PUT request
router.put("/update/:model/:id", assessmentController.updateRecord);

// DELETE request
router.delete("/:id", assessmentController.delAssessment);

module.exports = router;
