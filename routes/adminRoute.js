const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.post("/admin", adminController.createAdmin);
router.post("/staff", adminController.createStaff);
router.put("/staff/:id", adminController.updateStaff);
router.delete("/staff/:id", adminController.deleteStaff);
router.get("/staffs", adminController.getStaffs);

module.exports = router;
