const express = require("express");
const {
  createHistory,
  getHistory,
} = require("../controllers/historyController");

const router = express.Router();

router.post("/", createHistory); // Save history
router.get("/", getHistory); // Get history by staffId, type, model

module.exports = router;
