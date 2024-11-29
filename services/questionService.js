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

async function getBasicDetails(){
  return await Question.find({
    branch: "basicDetails",
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

// async function updateIndividualQuestion(updates) {
//   const updatePromises = updates.map(({ id, data }) =>
//     Question.findByIdAndUpdate(id, { question: data.question })
//   );
//   return await Promise.all(updatePromises);
// }
async function updateIndividualQuestion(updates) {
  const updatePromises = updates.map(({ id, data }) => {
    // Create an update object with the question field
    const updateData = { question: data.question };

    // If data.questionNo exists, add it to the update object
    if (data.questionNo !== undefined) {
      updateData.questionNo = data.questionNo;
    }

    // Update the question (and possibly questionNo) for the given id
    return Question.findByIdAndUpdate(id, updateData);
  });

  // Wait for all update operations to complete
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

// async function getAllTitles() {
//   const results = await Question.aggregate([
//     {
//       $group: {
//         _id: { branch: "$branch", name: "$name" }, // Group by both branch and name
//         titles: { $addToSet: "$title" }, // Use $addToSet to eliminate duplicate titles
//       },
//     },
//     {
//       $project: {
//         _id: 0, // Remove _id field
//         branch: "$_id.branch", // Include branch from _id
//         name: "$_id.name", // Include name from _id
//         titles: 1, // Include titles
//       },
//     },
//   ]);

//   const categories = await Question.aggregate([
//     {
//       $match: {
//         branch: "physiotherapy", // Filter based on branch
//         name: "physiotherapy", // Filter based on name
//       },
//     },
//     {
//       $group: {
//         _id: null, // No need to group by any field, just aggregate all
//         categories: { $addToSet: "$category" }, // Get unique categories
//       },
//     },
//     {
//       $project: {
//         _id: 0, // Remove _id field
//         categories: {
//           $filter: {
//             input: "$categories", // Filter the categories array
//             as: "category",
//             cond: { $ne: ["$$category", null] }, // Remove null values
//           },
//         },
//       },
//     },
//   ]);

//   return { results, categories };
// }

// SORT IS WORKING

// async function getAllTitles() {
//   // Aggregate results with sorting
//   const results = await Question.aggregate([
//     {
//       $group: {
//         _id: { branch: "$branch", name: "$name" }, // Group by both branch and name
//         titles: { $addToSet: "$title" }, // Use $addToSet to eliminate duplicate titles
//       },
//     },
//     {
//       $project: {
//         _id: 0, // Remove _id field
//         branch: "$_id.branch", // Include branch from _id
//         name: "$_id.name", // Include name from _id
//         titles: 1, // Include titles
//       },
//     },
//     {
//       $sort: {
//         branch: 1, // Sort branches alphabetically (ascending)
//         name: 1, // Sort names alphabetically (ascending)
//       },
//     },
//   ]);

//   // Aggregate categories with sorting
//   const categories = await Question.aggregate([
//     {
//       $match: {
//         branch: "physiotherapy", // Filter based on branch
//         name: "physiotherapy", // Filter based on name
//       },
//     },
//     {
//       $group: {
//         _id: null, // No need to group by any field, just aggregate all
//         categories: { $addToSet: "$category" }, // Get unique categories
//       },
//     },
//     {
//       $project: {
//         _id: 0, // Remove _id field
//         categories: {
//           $filter: {
//             input: "$categories", // Filter the categories array
//             as: "category",
//             cond: { $ne: ["$$category", null] }, // Remove null values
//           },
//         },
//       },
//     },
//     {
//       $sort: {
//         categories: 1, // Sort categories alphabetically (ascending)
//       },
//     },
//   ]);

//   return { results, categories };
// }

// SORT BASED UPON THE NUMBER
async function getAllTitles() {
  // Aggregate results with normalized and sorted titles
  const results = await Question.aggregate([
    {
      $group: {
        _id: { branch: "$branch", name: "$name" }, // Group by branch and name
        titles: { $addToSet: "$title" }, // Collect unique titles
      },
    },
    {
      $project: {
        _id: 0,
        branch: "$_id.branch",
        name: "$_id.name",
        normalizedTitles: {
          $map: {
            input: "$titles",
            as: "title",
            in: {
              original: "$$title",
              normalized: {
                $ifNull: [
                  {
                    $regexFind: {
                      input: "$$title",
                      regex: /^[^a-zA-Z]*(.+)/, // Match and capture meaningful part
                    },
                  }.match, // Directly access the match field
                  "$$title", // Default to original if no match
                ],
              },
            },
          },
        },
      },
    },
    {
      $addFields: {
        sortedTitles: {
          $map: {
            input: {
              $sortArray: {
                input: "$normalizedTitles",
                sortBy: { normalized: 1 },
              },
            },
            as: "title",
            in: "$$title.original", // Keep original title for output
          },
        },
      },
    },
    {
      $project: {
        branch: 1,
        name: 1,
        titles: "$sortedTitles", // Replace titles with sorted versions
      },
    },
    {
      $sort: {
        branch: 1, // Sort branches alphabetically
        name: 1, // Sort names alphabetically
      },
    },
  ]);

  // Aggregate and sort categories (handle non-numeric values gracefully)
  const categories = await Question.aggregate([
    {
      $match: {
        branch: "physiotherapy", // Filter based on branch
        name: "physiotherapy", // Filter based on name
      },
    },
    {
      $group: {
        _id: null, // Aggregate all into one group
        categories: { $addToSet: "$category" }, // Collect unique categories
      },
    },
    {
      $project: {
        _id: 0,
        categories: {
          $map: {
            input: "$categories",
            as: "category",
            in: {
              original: "$$category",
              number: {
                $cond: [
                  { $regexMatch: { input: "$$category", regex: /^[0-9]+$/ } }, // Check if it's numeric
                  { $toDouble: "$$category" }, // Convert numeric string to number
                  null, // Non-numeric strings get null
                ],
              },
            },
          },
        },
      },
    },
    {
      $addFields: {
        sortedCategories: {
          $map: {
            input: {
              $sortArray: {
                input: "$categories",
                sortBy: {
                  number: 1, // Sort by numeric value first (nulls go last)
                  original: 1, // Then by original string alphabetically
                },
              },
            },
            as: "category",
            in: "$$category.original", // Keep original category for output
          },
        },
      },
    },
    {
      $project: {
        categories: "$sortedCategories", // Replace categories with sorted versions
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
  getBasicDetails,
  getAllTitles,
};
