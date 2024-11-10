const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/login", authController.login);
router.put("/forget-password", authController.forgetPassword);

module.exports = router;
