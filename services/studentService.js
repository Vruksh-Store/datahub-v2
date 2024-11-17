const {
  Student,
  PhysioTherapyAssessment,
  Staff,
  SelfHelpSkillAssessment,
} = require("../models/models");
const bcrypt = require("bcrypt");
const {
  PrimaryAssessment,
  SecondaryAssessment,
  VocationalAssessment,
  CustomAssessment,
  TemplateCaseRecord,
  SpeechLanguageProfile,
  HomeProgram,
} = require("../models/models");

async function createStudent(studentData) {
  const saltRounds = 5;
  const hashedPassword = await bcrypt.hash(studentData.password, saltRounds);
  const newStudent = new Student({
    ...studentData,
    password: hashedPassword,
  });
  return await newStudent.save();
}

async function getStudents() {
  return await Student.find({}, { password: 0 });
}

async function getIndividualStudent(id) {
  console.log('control reached')
  return await Student.findById(id);
}

async function loginStudents(name, password) {
  const student = await Student.findOne({ name });

  if (student && (await bcrypt.compare(password, student.password))) {
    return student;
  }
  return null;
}

async function resetPwd(phone, newPassword) {
  const saltRounds = 5;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  const updatedStudent = await Student.findOneAndUpdate(
    { phone },
    { password: hashedPassword },
    { new: true }
  );

  return updatedStudent;
}

async function feesUpdate(studentId, date, amount) {
  return await Student.findByIdAndUpdate(
    studentId,
    {
      $push: { fees: { date, amount, amountPaid: true } },
    },
    { new: true }
  );
}

async function studentUpdate(
  id,
  name,
  phone,
  level,
  registerNo,
  gender,
  newPassword
) {
  let updateData = { name, phone, level, registerNo, gender };

  if (newPassword) {
    const saltRounds = 5;
    updateData.password = await bcrypt.hash(newPassword, saltRounds);
  }

  return await Student.findByIdAndUpdate(id, updateData, { new: true });
}

async function studentDelete(id) {
  return await Student.findByIdAndDelete(id);
}

// // Function to fetch all assessments of a student
// const getAllAssessments = async (studentId) => {
//   try {
//     // Fetch all assessments related to the student
//     const primaryAssessments = await PrimaryAssessment.find({
//       studentReference: studentId,
//     })
//       .select("date _id goal review ")
//       .sort({ createdAt: -1 });
//     const secondaryAssessments = await SecondaryAssessment.find({
//       studentReference: studentId,
//     })
//       .select("date _id goal review ")
//       .sort({ createdAt: -1 });
//     const vocationalAssessments = await VocationalAssessment.find({
//       studentReference: studentId,
//     })
//       .select("date _id goal review ")
//       .sort({ createdAt: -1 });
//     const physioTherapyAssessments = await PhysioTherapyAssessment.find({
//       studentReference: studentId,
//     })
//       .select("date _id goal review ")
//       .sort({ createdAt: -1 });
//     const customAssessments = await CustomAssessment.find({
//       studentReference: studentId,
//     }).select("date _id goal review");
//     const templateCaseRecords = await TemplateCaseRecord.find({
//       studentReference: studentId,
//     })
//       .select("date _id goal review ")
//       .sort({ createdAt: -1 });
//     const speechLanguageProfiles = await SpeechLanguageProfile.find({
//       studentReference: studentId,
//     })
//       .select("date _id goal review ")
//       .sort({ createdAt: -1 });
//     const homePrograms = await HomeProgram.find({
//       studentReference: studentId,
//     })
//       .select("date _id goal review ")
//       .sort({ createdAt: -1 });

//     // Combine all assessments into a single array
//     console.log(customAssessments);
//     const assessments = [
//       ...primaryAssessments.map((assessment) => ({
//         branch: "primary",
//         id: assessment._id,
//         goal: assessment.goal,
//         review: assessment.review,
//         date: assessment.date,
//       })),
//       ...secondaryAssessments.map((assessment) => ({
//         branch: "secondary",
//         id: assessment._id,
//         goal: assessment.goal,
//         review: assessment.review,
//         date: assessment.date,
//       })),
//       ...vocationalAssessments.map((assessment) => ({
//         branch: "vocational",
//         id: assessment._id,
//         goal: assessment.goal,
//         review: assessment.review,
//         date: assessment.date,
//       })),
//       ...physioTherapyAssessments.map((assessment) => ({
//         branch: "physiotherapy",
//         id: assessment._id,
//         goal: assessment.goal,
//         review: assessment.review,
//         date: assessment.date,
//       })),
//       ...customAssessments.map((assessment) => ({
//         branch: "custom",
//         id: assessment._id,
//         goal: assessment.goal,
//         review: assessment.review,
//         date: assessment.date,
//       })),
//     ];

//     console.log(assessments);

//     return assessments;
//   } catch (error) {
//     console.error("Error fetching assessments:", error);
//   }
// };

const getAllAssessments = async (studentId) => {
  try {
    // Fetch all assessments related to the student, populating the userName from Staff
    const primaryAssessments = await PrimaryAssessment.find({
      studentReference: studentId,
    })
      .select("date _id goal review staffReference")
      .populate("staffReference", "userName") // Populate only the userName from Staff
      .sort({ createdAt: -1 });

    const secondaryAssessments = await SecondaryAssessment.find({
      studentReference: studentId,
    })
      .select("date _id goal review staffReference")
      .populate("staffReference", "userName")
      .sort({ createdAt: -1 });

    const vocationalAssessments = await VocationalAssessment.find({
      studentReference: studentId,
    })
      .select("date _id goal review staffReference")
      .populate("staffReference", "userName")
      .sort({ createdAt: -1 });

    const physioTherapyAssessments = await PhysioTherapyAssessment.find({
      studentReference: studentId,
    })
      .select("date _id goal review staffReference")
      .populate("staffReference", "userName")
      .sort({ createdAt: -1 });

    const customAssessments = await CustomAssessment.find({
      studentReference: studentId,
    })
      .select("date _id goal review staffReference")
      .populate("staffReference", "userName");

    const templateCaseRecords = await TemplateCaseRecord.find({
      studentReference: studentId,
    })
      .select("date _id goal review staffReference")
      .populate("staffReference", "userName")
      .sort({ createdAt: -1 });

    const speechLanguageProfiles = await SpeechLanguageProfile.find({
      studentReference: studentId,
    })
      .select("date _id goal review staffReference")
      .populate("staffReference", "userName")
      .sort({ createdAt: -1 });

    const selfHelpSkillAssessment = await SelfHelpSkillAssessment.find({
      studentReference: studentId,
    })
      .select("date _id goal review staffReference")
      .populate("staffReference", "userName")
      .sort({ createdAt: -1 });

    const homePrograms = await HomeProgram.find({
      studentReference: studentId,
    })
      .select("date _id goal review staffReference")
      .populate("staffReference", "userName")
      .sort({ createdAt: -1 });

    // Combine all assessments into a single array
    const assessments = [
      ...primaryAssessments.map((assessment) => ({
        branch: "primary",
        id: assessment._id,
        goal: assessment.goal,
        review: assessment.review,
        date: assessment.date,
        userName: assessment.staffReference?.userName || null, // Extract userName if exists
      })),
      ...secondaryAssessments.map((assessment) => ({
        branch: "secondary",
        id: assessment._id,
        goal: assessment.goal,
        review: assessment.review,
        date: assessment.date,
        userName: assessment.staffReference?.userName || null,
      })),
      ...vocationalAssessments.map((assessment) => ({
        branch: "vocational",
        id: assessment._id,
        goal: assessment.goal,
        review: assessment.review,
        date: assessment.date,
        userName: assessment.staffReference?.userName || null,
      })),
      ...physioTherapyAssessments.map((assessment) => ({
        branch: "physiotherapy",
        id: assessment._id,
        goal: assessment.goal,
        review: assessment.review,
        date: assessment.date,
        userName: assessment.staffReference?.userName || null,
      })),
      ...customAssessments.map((assessment) => ({
        branch: "custom",
        id: assessment._id,
        goal: assessment.goal,
        review: assessment.review,
        date: assessment.date,
        userName: assessment.staffReference?.userName || null,
      })),
      ...selfHelpSkillAssessment.map((assessment) => ({
        branch: "selfhelp",
        id: assessment._id,
        goal: assessment.goal,
        review: assessment.review,
        date: assessment.date,
        userName: assessment.staffReference?.userName || null,
      })),
    ];

    return assessments;
  } catch (error) {
    console.error("Error fetching assessments:", error);
  }
};

async function getUserStudents(id) {
  return await Staff.find({ _id: id }).populate({
    path: "students",
    select: "_id registerNo name level gender phone",
  });
}

const createGrowthAndDevelopment = async (studentId, growthData) => {
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      throw new Error("Student not found");
    }
    student.growthAndDevelopment.push(growthData);

    await student.save();

    return student.growthAndDevelopment;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateGrowthAndDevelopment = async (studentId, recordId, growthData) => {
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      throw new Error("Student not found");
    }
    const recordIndex = student.growthAndDevelopment.findIndex(
      (record) => record._id.toString() === recordId
    );
    if (recordIndex === -1) {
      throw new Error("Growth and development record not found");
    }
    student.growthAndDevelopment[recordIndex] = growthData;
    await student.save();

    return student.growthAndDevelopment[recordIndex];
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteGrowthAndDevelopment = async (studentId, recordId) => {
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      throw new Error("Student not found");
    }

    const recordIndex = student.growthAndDevelopment.findIndex(
      (record) => record._id.toString() === recordId
    );
    if (recordIndex === -1) {
      throw new Error("Growth and development record not found");
    }

    student.growthAndDevelopment.splice(recordIndex, 1);
    await student.save();
    return { message: "Growth and development record deleted successfully" };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  createStudent,
  getStudents,
  loginStudents,
  resetPwd,
  feesUpdate,
  studentUpdate,
  studentDelete,
  getIndividualStudent,
  getAllAssessments,
  getUserStudents,
  createGrowthAndDevelopment,
  updateGrowthAndDevelopment,
  deleteGrowthAndDevelopment,
};
