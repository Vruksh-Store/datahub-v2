const express = require("express");
const assessmentController = require("../controllers/assessmentController");
const setAssessmentModel = require("../middlewares/setAssessmentModel");
const checkIfExist = require("../middlewares/checkToken");

const router = express.Router();

router.use(checkIfExist, setAssessmentModel);

// POST request
router.post("/", assessmentController.createAssessment);

// GET requests
router.get("/student/:studentId", assessmentController.getAssessments);
router.get("/assessment/:id", assessmentController.getAssessment);

// PUT request
router.put("/update/:id", assessmentController.updateRecord);

// DELETE request
router.delete("/:id", assessmentController.delAssessment);

module.exports = router;
