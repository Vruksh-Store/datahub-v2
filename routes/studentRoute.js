const express = require("express");
const studentController = require("../controllers/studentController");
const router = express.Router();

// admin side
router.post("/", studentController.createStudent);
router.get("/", studentController.getStudents);

// get individual student by id
router.get("/:id", studentController.getStudent);

// add a update fee
router.put("/fee/:id", studentController.updateFee);
// update only name - phonenumber - level
router.put("/update/:id", studentController.updateStudents);
// delete student
router.delete("/:id", studentController.delStudent);
// users side
router.post("/login", studentController.loginStudent);
router.put("/forget-password", studentController.forgetPassword);

router.get("/all-assessments/:id", studentController.getAllAssessments);

//new
router.get("/admin/get-students", studentController.getStudents);
router.get("/user/:id/get-students", studentController.getUserStudents);

// growth and dev
router.post(
  "/:id/growthanddevelopment",
  studentController.createGrowthAndDevelopment
);
router.put(
  "/:id/growthanddevelopment/:recordId",
  studentController.updateGrowthAndDevelopment
);
router.delete(
  "/:id/growthanddevelopment/:recordId",
  studentController.deleteGrowthAndDevelopment
);

module.exports = router;
