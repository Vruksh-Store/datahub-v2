const assessmentService = require("../services/assessmentService");
const {
  PrimaryAssessment,
  SecondaryAssessment,
  VocationalAssessment,
  CustomAssessment,
} = require("../models/models");

const modelMap = {
  PrimaryAssessment,
  SecondaryAssessment,
  VocationalAssessment,
  CustomAssessment,
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
      selectedAssessment,
      req.params.studentId
    );
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAssessment = async (req, res) => {
  const modelName = req.params.model;
  const model = modelMap[modelName];
  try {
    const assessment = await assessmentService.getIndividualAssessment(
      model,
      req.params.id
    );
    res.json(assessment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateRecord = async (req, res) => {
  console.log("Route accessed - getAssessment");
  const modelName = req.params.model;
  const model = modelMap[modelName];
  console.log("Model name from params:", modelName);
  console.log("ModelMap:", modelMap);
  console.log("Selected model:", model, "Assessment ID:", req.params.id);

  // Check if model exists in modelMap
  if (!model) {
    return res.status(400).json({ message: "Invalid assessment type!" });
  }
  try {
    const result = await assessmentService.updateAssessmentRecord(
      model,
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

exports.getCustomAssessmentsName = async (req, res) => {
  try {
    const result = await assessmentService.customAssessmentNames();
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCustomAssessmentsQuestions = async (req, res) => {
  try {
    const result = await assessmentService.customAssessmentQuesions(
      req.params.name
    );
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
