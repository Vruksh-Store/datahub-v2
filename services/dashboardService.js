const mongoose = require("mongoose");

exports.fetchAssessments = async (modelName, staffId) => {
  try {
    const validModels = [
      "Student",
      "Admin",
      "Staff",
      "PrimaryAssessment",
      "SelfHelpSkillAssessment",
      "SecondaryAssessment",
      "VocationalAssessment",
      "PhysioTherapyAssessment",
      "CustomAssessment",
      "TemplateCaseRecord",
      "SpeechLanguageProfile",
      "Question",
      "HomeProgram",
      "Activity",
      "WorkSpace",
      "StaffMeeting",
      "TeachingLearningMaterial",
      "BasicDetails",
      "History",
    ];

    if (!validModels.includes(modelName)) {
      throw new Error("Invalid model name");
    }

    const Model = mongoose.model(modelName);
    return await Model.find({ staffReference: staffId })
      .sort({
        updatedAt: -1,
      })
      .populate({
        path: "staffReference",
      })
      .populate({
        path: "studentReference",
      });
  } catch (error) {
    console.error(`Error fetching data for ${modelName}:`, error);
    throw error;
  }
};
