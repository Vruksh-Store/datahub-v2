const { Student } = require("../models/models");

async function createAssessment(model, data) {
  const newAssessment = await new model(data).save();
  await Student.findByIdAndUpdate(newAssessment.studentReference, {
    $push: {
      assessments: {
        _id: newAssessment._id,
        modelType: model.modelName,
      },
    },
  });
  return newAssessment;
}

async function getAssessments(model, studentId) {
  return await model.find({ studentReference: studentId });
}

async function getIndividualAssessment(model, id) {
  return await model.findById(id).populate("answers.questionId");
}

async function updateAssessmentRecord(model, id, data) {
  return await model.findByIdAndUpdate(id, data, { new: true });
}

async function deleteAssessment(model, id) {
  return await model.findByIdAndDelete(id);
}

module.exports = {
  createAssessment,
  getAssessments,
  getIndividualAssessment,
  updateAssessmentRecord,
  deleteAssessment,
};
