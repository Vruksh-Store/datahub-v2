const express = require("express");
const activityController = require("../controllers/activityController");

const router = express.Router();

router.post("/create", activityController.createActivity);

module.exports = router;
