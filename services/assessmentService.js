const {
  Student,
  Question,
  HomeProgram,
  PhysioTherapyAssessment,
  PrimaryAssessment,
  SecondaryAssessment,
  VocationalAssessment,
} = require("../models/models");

async function createAssessment(model, data) {
  console.log("dddd");
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

// Route to get all students who have completed different types of assessments
async function getDifferentAssessments() {
  try {
    // Helper function to map assessment data and avoid duplicates
    // const mapUniqueStudents = (assessmentData) => {
    //   const uniqueStudents = new Map();
    //   assessmentData.forEach((assessment) => {
    //     const student = assessment.studentReference;
    //     if (!uniqueStudents.has(student._id.toString())) {
    //       uniqueStudents.set(student._id.toString(), {
    //         _id: student._id,
    //         name: student.name,
    //         registerNo: student.registerNo,
    //         level: student.level,
    //       });
    //     }
    //   });
    //   return Array.from(uniqueStudents.values());
    // };
    const mapUniqueStudents = (assessmentData) => {
      const uniqueStudents = new Map();
      assessmentData.forEach((assessment) => {
        const student = assessment.studentReference;

        // Check if the studentReference exists and is not null
        if (student && student._id) {
          if (!uniqueStudents.has(student._id.toString())) {
            uniqueStudents.set(student._id.toString(), {
              _id: student._id,
              name: student.name,
              registerNo: student.registerNo,
              level: student.level,
            });
          }
        } else {
          console.warn(
            "Missing or invalid studentReference in assessment:",
            assessment
          );
        }
      });
      return Array.from(uniqueStudents.values());
    };

    // Fetch and process each assessment type
    const primaryAssessmentStudents = await PrimaryAssessment.find()
      .select("studentReference")
      .populate("studentReference", "_id name registerNo level")
      .exec();
    const primaryStudents = mapUniqueStudents(primaryAssessmentStudents);

    const secondaryAssessmentStudents = await SecondaryAssessment.find()
      .select("studentReference")
      .populate("studentReference", "_id name registerNo level")
      .exec();
    const secondaryStudents = mapUniqueStudents(secondaryAssessmentStudents);

    const vocationalAssessmentStudents = await VocationalAssessment.find()
      .select("studentReference")
      .populate("studentReference", "_id name registerNo level")
      .exec();
    const vocationalStudents = mapUniqueStudents(vocationalAssessmentStudents);

    const physiotherapyAssessmentStudents = await PhysioTherapyAssessment.find()
      .select("studentReference")
      .populate("studentReference", "_id name registerNo level")
      .exec();
    const physiotherapyStudents = mapUniqueStudents(
      physiotherapyAssessmentStudents
    );

    const homePrograms = await HomeProgram.find()
      .select("studentReference")
      .populate("studentReference", "_id name registerNo level")
      .exec();
    const homeProgramStudents = mapUniqueStudents(homePrograms);

    // Structure the response as requested
    const response = {
      primary: primaryStudents,
      secondary: secondaryStudents,
      vocational: vocationalStudents,
      physiotherapy: physiotherapyStudents,
      homeProgram: homeProgramStudents,
    };

    return response;
  } catch (error) {
    console.error("Error fetching assessed students:", error);
    throw new Error("Failed to fetch assessment data");
  }
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
  getDifferentAssessments,
};
