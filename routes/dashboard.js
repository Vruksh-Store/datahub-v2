// routes/dashboard.js
const express = require("express");
const {
  Student,
  PrimaryAssessment,
  SecondaryAssessment,
  VocationalAssessment,
  CustomAssessment,
  Question,
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

module.exports = router;
