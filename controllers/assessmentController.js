const assessmentService = require("../services/assessmentService");
const {
  PrimaryAssessment,
  SecondaryAssessment,
  VocationalAssessment,
  CustomAssessment,
  TemplateCaseRecord,
  SpeechLanguageProfile,
} = require("../models/models");

const modelMap = {
  PrimaryAssessment,
  SecondaryAssessment,
  VocationalAssessment,
  CustomAssessment,
  TemplateCaseRecord,
  SpeechLanguageProfile,
};

exports.createAssessment = async (req, res) => {
  const modelName = req.params.model;
  const model = modelMap[modelName];

  try {
    const assessment = await assessmentService.createAssessment(
      model,
      req.body
    );
    res.status(201).json(assessment);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.getAssessments = async (req, res) => {
  try {
    const assessments = await assessmentService.getAssessments(
      req.assessmentModel,
      req.params.studentId
    );
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAssessment = async (req, res) => {
  try {
    const assessment = await assessmentService.getIndividualAssessment(
      req.assessmentModel,
      req.params.id
    );
    res.json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const result = await assessmentService.updateAssessmentRecord(
      req.assessmentModel,
      req.params.id,
      req.body
    );
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delAssessment = async (req, res) => {
  try {
    const result = await assessmentService.deleteAssessment(
      req.assessmentModel,
      req.params.id
    );
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
