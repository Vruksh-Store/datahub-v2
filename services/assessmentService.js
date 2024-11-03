const { Student } = require("../models/models");

async function createAssessment(model, data) {
  console.log(model, data);
  console.log("Model Type:", typeof model);
  console.log("Model:", model);
  console.log("Model Name:", model.modelName);
  console.log("Is Model a Mongoose Model?", !!model.schema);

  const newAssessment = await new model(data).save();
  console.log(newAssessment);
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
