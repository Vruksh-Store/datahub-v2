const {
  PrimaryAssessment,
  SecondaryAssessment,
  VocationalAssessment,
  CustomAssessment,
  TemplateCaseRecord,
  SpeechLanguageProfile,
  PhysioTherapyAssessment,
} = require("../models/models");

const setAssessmentModel = (req, res, next) => {
  const assessmentType = req.baseUrl.split("/")[2];
  switch (assessmentType) {
    case "primary-assessments":
      req.assessmentModel = PrimaryAssessment;
      break;
    case "secondary-assessments":
      req.assessmentModel = SecondaryAssessment;
      break;
    case "vocational-assessments":
      req.assessmentModel = VocationalAssessment;
      break;
    case "physiotherapy-assessments":
      console.log("it is correct");
      req.assessmentModel = PhysioTherapyAssessment;
      break;
    case "custom-assessments":
      req.assessmentModel = CustomAssessment;
      break;
    case "templatecase":
      req.assessmentModel = TemplateCaseRecord;
      break;
    case "speechlanguage":
      req.assessmentModel = SpeechLanguageProfile;
      break;
    default:
      return res.status(400).json({ message: "Invalid assessment type" });
  }
  next();
};

module.exports = setAssessmentModel;
