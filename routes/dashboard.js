// routes/dashboard.js
const express = require("express");
const {
  Student,
  PrimaryAssessment,
  SecondaryAssessment,
  VocationalAssessment,
  CustomAssessment,
  Question,
  TemplateCaseRecord,
  SpeechLanguageProfile,
  PhysioTherapyAssessment,
  Staff,
  Activity,
} = require("../models/models");
const router = express.Router();
const { createChart } = require("../utils/chartGenerator"); // Utility function for generating charts

// GET /api/dashboard
router.get("/", async (req, res) => {
  try {
    // Get total students
    const totalStudents = await Student.countDocuments();

    // Get students by level
    const studentsByLevel = await Student.aggregate([
      {
        $group: {
          _id: "$level",
          count: { $sum: 1 },
        },
      },
    ]);

    // Generate charts or images for the dashboard
    const totalStudentsImage = await createChart(
      totalStudents,
      "Total Students"
    );
    const studentsByLevelImage = await createChart(
      studentsByLevel,
      "Students by Level"
    );

    console.log(totalStudentsImage);
    console.log(studentsByLevelImage);
    res.json({
      totalStudents: totalStudentsImage,
      studentsByLevel: studentsByLevelImage,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/dashboard/total-assessments
router.get("/total-assessments", async (req, res) => {
  try {
    // Count completed assessments in each category
    const totalPrimary = await PrimaryAssessment.countDocuments();
    const totalSecondary = await SecondaryAssessment.countDocuments();
    const totalVocational = await VocationalAssessment.countDocuments();

    // Calculate the total
    const totalAssessments = totalPrimary + totalSecondary + totalVocational;

    res.json({
      totalAssessments,
    });
  } catch (error) {
    console.error("Error fetching total assessments:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// New GET /api/dashboard/assessment-counts endpoint
router.get("/assessment-counts", async (req, res) => {
  try {
    const primaryCount = await PrimaryAssessment.countDocuments();
    const secondaryCount = await SecondaryAssessment.countDocuments();
    const vocationalCount = await VocationalAssessment.countDocuments();
    const customCount = await CustomAssessment.countDocuments();

    res.json({
      primary: primaryCount,
      secondary: secondaryCount,
      vocational: vocationalCount,
      custom: customCount,
    });
  } catch (error) {
    console.error("Error fetching assessment counts:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// New GET /api/dashboard/question-counts endpoint
router.get("/question-counts", async (req, res) => {
  try {
    const primaryCount = await Question.countDocuments({ branch: "primary" });
    const secondaryCount = await Question.countDocuments({
      branch: "secondary",
    });
    const vocationalCount = await Question.countDocuments({
      branch: "vocational",
    });
    const customCount = await Question.countDocuments({ branch: "custom" });

    res.json({
      primary: primaryCount,
      secondary: secondaryCount,
      vocational: vocationalCount,
      custom: customCount,
    });
  } catch (error) {
    console.error("Error fetching question counts:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/dashboard/staff-assessments
router.get("/staff-assessments", async (req, res) => {
  const staffId = req.query.staffId; // Assume staffId is passed as a query parameter

  try {
    // Filter assessments by staffId for each category
    const primaryCount = await PrimaryAssessment.countDocuments({
      staffReference: staffId,
    });
    const secondaryCount = await SecondaryAssessment.countDocuments({
      staffReference: staffId,
    });
    const vocationalCount = await VocationalAssessment.countDocuments({
      staffReference: staffId,
    });
    const customCount = await CustomAssessment.countDocuments({
      staffReference: staffId,
    });
    const templateCaseCount = await TemplateCaseRecord.countDocuments({
      staffReference: staffId,
    });
    const speechLanguageCount = await SpeechLanguageProfile.countDocuments({
      staffReference: staffId,
    });
    const physioCount = await PhysioTherapyAssessment.countDocuments({
      staffReference: staffId,
    });

    // Prepare the data in an array format for charting
    const data = [
      { _id: "Primary", count: primaryCount },
      { _id: "Secondary", count: secondaryCount },
      { _id: "Vocational", count: vocationalCount },
      { _id: "Custom", count: customCount },
      { _id: "Template Case", count: templateCaseCount },
      { _id: "Speech Language", count: speechLanguageCount },
      { _id: "PhysioTherapist", count: physioCount },
    ];

    // Generate chart for staff's assessments
    const staffAssessmentsImage = await createChart(
      data,
      "Assessments Conducted by You"
    );

    res.json({
      staffAssessmentsImage,
    });
  } catch (error) {
    console.error("Error fetching staff assessments:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/dashboard/staff-student-levels
router.get("/staff-student-levels", async (req, res) => {
  const { staffId } = req.query;

  try {
    // Find the staff member and populate the students array
    const staff = await Staff.findById(staffId).populate("students");

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    // Aggregate the students' levels and count them
    const studentsByLevel = await Student.aggregate([
      {
        $match: { _id: { $in: staff.students.map((student) => student._id) } },
      }, // Match only the staff's students
      { $group: { _id: "$level", count: { $sum: 1 } } }, // Group by level and count each level
    ]);
    console.log(studentsByLevel);
    res.json({ studentsByLevel });
  } catch (error) {
    console.error("Error fetching student levels by staff:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get the 5 most recent activities for a staff member
router.get("/staff/:staffId/recent-activities", async (req, res) => {
  try {
    const staffId = req.params.staffId;

    // Fetch the 5 most recent activities for the staff member
    const activities = await Activity.find({ userId: staffId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching recent activities");
  }
});

module.exports = router;
