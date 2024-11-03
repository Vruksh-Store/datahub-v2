const { Question } = require("../models/models");

async function createQuestion(data) {
  return await new Question(data).save();
}

async function getAll() {
  return await Question.find();
}

async function getPrimary() {
  return await Question.find({
    branch: "primary",
  });
}

async function getSecondary() {
  return await Question.find({
    branch: "secondary",
  });
}

async function getVocational() {
  return await Question.find({
    branch: "vocational",
  });
}

async function getIndividualQ(id) {
  return await Question.findById(id);
}

async function getIndividualQByTitle(data) {
  return await Question.find({
    title: data,
  });
}

async function updateIndividualQuestion(id, data) {
  return await Question.findByIdAndUpdate(id, data);
}

async function delQ(id) {
  return await Question.findByIdAndDelete(id);
}

async function delName(name) {
  return await Question.deleteOne({ name });
}

async function delTitle(name, title) {
  return await Question.findOneAndDelete({ name, title });
}

module.exports = {
  createQuestion,
  getAll,
  getPrimary,
  getSecondary,
  getVocational,
  getIndividualQ,
  getIndividualQByTitle,
  updateIndividualQuestion,
  delQ,
  delName,
  delTitle,
};
