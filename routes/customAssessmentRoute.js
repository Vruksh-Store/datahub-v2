const express = require("express");
const assessmentController = require("../controllers/assessmentController");

const router = express.Router();

router.get("/get-custom-names", assessmentController.getCustomAssessmentsName);
router.get(
  "/get-custom-questions/:name",
  assessmentController.getCustomAssessmentsQuestions
);

module.exports = router;
