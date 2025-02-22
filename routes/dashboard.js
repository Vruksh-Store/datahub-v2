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

    console.log("Total Students:", totalStudents);

    // Get students by level
    const studentsByLevel = await Student.aggregate([
      {
        $group: {
          _id: "$level", // Group by the 'level' field
          count: { $sum: 1 }, // Count the number of students in each level
        },
      },
      {
        $project: {
          _id: 0, // Exclude the '_id' field from the output
          label: "$_id", // Rename '_id' field to 'label'
          value: "$count", // Rename 'count' field to 'value'
        },
      },
    ]);

    // Get gender count by level
    const genderCountByLevel = await Student.aggregate([
      {
        $group: {
          _id: { level: "$level", gender: "$gender" }, // Group by both level and gender
          count: { $sum: 1 }, // Count the number of students in each gender at each level
        },
      },
      {
        $project: {
          _id: 0, // Exclude the '_id' field from the output
          level: "$_id.level", // Extract 'level' from '_id'
          gender: "$_id.gender", // Extract 'gender' from '_id'
          count: 1, // Keep the count
        },
      },
      {
        $group: {
          _id: "$level", // Group by level again to merge male and female counts per level
          maleCount: {
            $sum: {
              $cond: [{ $eq: ["$gender", "male"] }, "$count", 0], // Sum count where gender is male
            },
          },
          femaleCount: {
            $sum: {
              $cond: [{ $eq: ["$gender", "female"] }, "$count", 0], // Sum count where gender is female
            },
          },
        },
      },
      {
        $sort: {
          _id: 1, // Sort alphabetically (could be redundant but can be useful for debugging)
        },
      },
      {
        $project: {
          level: 1,
          maleCount: 1,
          femaleCount: 1,
        },
      },
    ]);

    // Now we ensure the specific order for levels: pre-primary, primary, secondary, pre-vocational, vocational
    const levelOrder = [
      "pre-primary",
      "primary",
      "secondary",
      "pre-vocational",
      "vocational",
    ];

    // Ensure the data is arranged according to the `levelOrder` array
    const sortedGenderCountByLevel = levelOrder.map((level) => {
      // Find the corresponding data for the current level
      const levelData = genderCountByLevel.find((item) => item._id === level);

      // If data is found for the level, use it, otherwise default to 0 for counts
      return {
        level: level,
        maleCount: levelData ? levelData.maleCount : 0,
        femaleCount: levelData ? levelData.femaleCount : 0,
      };
    });

    console.log("Sorted Gender Count by Level:", sortedGenderCountByLevel);

    // Generate charts or images for the dashboard
    const totalStudentsImage = await createChart(
      totalStudents,
      "Total Students"
    );
    const genderChart = await createChart(
      sortedGenderCountByLevel,
      "Male & Female students by Level"
    );

    // Send the data and charts to the front-end
    res.json({
      totalStudents: totalStudentsImage,
      studentsByLevel,
      genderCountByLevel: sortedGenderCountByLevel, // Send the sorted gender data
      genderChart,
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

    const hasAtLeastOneNonEmpty = data.some(
      (item) => item.count !== 0 && item.count !== undefined
    );

    if (hasAtLeastOneNonEmpty) {
      res.json({
        message: "notFound",
      });
    } else {
      // Generate chart for staff's assessments
      const staffAssessmentsImage = await createChart(
        data,
        "Assessments Conducted by You"
      );

      res.json({
        staffAssessmentsImage,
      });
    }
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

    if (staffId === "username") {
      const activities = await Activity.find({ userName: "adminadmin" })
        .sort({ createdAt: -1 })
        .limit(5);

      res.json(activities);
    } else {
      // Fetch the 5 most recent activities for the staff member
      const activities = await Activity.find({ userId: staffId })
        .sort({ createdAt: -1 })
        .limit(5);

      res.json(activities);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching recent activities");
  }
});

// Get students assigned to a specific staff member
router.get("/dstaff/:userId/students", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find staff and populate student details
    const staff = await Staff.findOne({ _id: userId }).populate("students");

    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    res.status(200).json({ students: staff.students });
  } catch (error) {
    console.error("Error fetching staff students:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
