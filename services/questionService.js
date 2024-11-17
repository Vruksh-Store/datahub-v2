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

async function getSelfHelpSkillQuesions() {
  return await Question.find({
    branch: "selfhelp",
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

async function getTemplateCase() {
  return await Question.find({
    branch: "templatecase",
  });
}

async function getSpeechLanguage() {
  return await Question.find({
    branch: "speechlanguage",
  });
}

async function getPhysioTherapy() {
  return await Question.find({
    branch: "physiotherapy",
  });
}

async function getCustom(name) {
  return await Question.find({
    branch: "vocational",
    name: name,
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

async function updateIndividualQuestion(updates) {
  const updatePromises = updates.map(({ id, data }) =>
    Question.findByIdAndUpdate(id, { question: data.question })
  );
  return await Promise.all(updatePromises);
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

async function getAllTitles() {
  const results = await Question.aggregate([
    {
      $group: {
        _id: { branch: "$branch", name: "$name" }, // Group by both branch and name
        titles: { $addToSet: "$title" }, // Use $addToSet to eliminate duplicate titles
      },
    },
    {
      $project: {
        _id: 0, // Remove _id field
        branch: "$_id.branch", // Include branch from _id
        name: "$_id.name", // Include name from _id
        titles: 1, // Include titles
      },
    },
  ]);

  const categories = await Question.aggregate([
    {
      $match: {
        branch: "physiotherapy", // Filter based on branch
        name: "physiotherapy", // Filter based on name
      },
    },
    {
      $group: {
        _id: null, // No need to group by any field, just aggregate all
        categories: { $addToSet: "$category" }, // Get unique categories
      },
    },
    {
      $project: {
        _id: 0, // Remove _id field
        categories: {
          $filter: {
            input: "$categories", // Filter the categories array
            as: "category",
            cond: { $ne: ["$$category", null] }, // Remove null values
          },
        },
      },
    },
  ]);

  return { results, categories };
}

module.exports = {
  createQuestion,
  getAll,
  getPrimary,
  getSelfHelpSkillQuesions,
  getSecondary,
  getVocational,
  getTemplateCase,
  getSpeechLanguage,
  getPhysioTherapy,
  getCustom,
  getIndividualQ,
  getIndividualQByTitle,
  updateIndividualQuestion,
  delQ,
  delName,
  delTitle,
  getAllTitles,
};
