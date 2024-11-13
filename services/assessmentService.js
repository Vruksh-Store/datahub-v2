const { Student, Question } = require("../models/models");

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
  console.log(model);
  console.log("Model Type:", typeof model);
  console.log("Model:", model);
  console.log("Model Name:", model.modelName);
  console.log("Is Model a Mongoose Model?", !!model.schema);
  return await model.findById(id).populate("answers.questionId");
}

async function getLatestAssessment(model, id) {
  console.log(model);
  console.log("Model Type:", typeof model);
  console.log("Model:", model);
  console.log("Model Name:", model.modelName);
  console.log("Is Model a Mongoose Model?", !!model.schema);
  return await model.findById(id);
}

async function updateAssessmentRecord(model, id, data) {
  console.log("fffff");
  console.log(model, id);
  return await model.findByIdAndUpdate(
    id,
    { answers: data.answers },
    { new: true }
  );
}

async function deleteAssessment(model, id) {
  return await model.findByIdAndDelete(id);
}

async function customAssessmentNames() {
  const customQuestions = await Question.find({ branch: "custom" });

  const uniqueNames = new Set(customQuestions.map((question) => question.name));

  const uniqueNamesArray = Array.from(uniqueNames);

  return uniqueNamesArray;
}

async function customAssessmentQuesions(name) {
  const customQuestions = await Question.find({ branch: "custom", name: name });

  return customQuestions;
}

module.exports = {
  createAssessment,
  getAssessments,
  getIndividualAssessment,
  updateAssessmentRecord,
  deleteAssessment,
  customAssessmentNames,
  customAssessmentQuesions,
  getLatestAssessment,
};
