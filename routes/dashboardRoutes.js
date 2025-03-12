const express = require("express");
const router = express.Router();
const assessmentController = require("../controllers/dashboardController");

router.get("/:model/:staffId", assessmentController.getAssessmentsByModel);

module.exports = router;
