const express = require("express");
const activityController = require("../controllers/activityController");

const router = express.Router();

router.get("/:admin/:userId", activityController.getActivities);

router.post("/create", activityController.createActivity);

module.exports = router;
