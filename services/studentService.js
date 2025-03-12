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

const crypto = require("crypto");
const { start } = require("repl");

const SECRET_KEY = "webgi215.official@gmail.com";

function encrypt(text, password) {
  text = text.toString();
  password = password.toString();

  const key = crypto.createHash("sha256").update(password).digest();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
}

async function createStudent(studentData) {
  const encryptedPassword = encrypt(studentData.password, SECRET_KEY);

  const newStudent = new Student({
    ...studentData,
    password: encryptedPassword,
  });

  return await newStudent.save();
}

async function getStudents() {
  return await Student.find();
}

async function getIndividualStudent(id) {
  console.log("control reached");
  return await Student.findById(id);
}

function decrypt(encryptedText, password) {
  if (!encryptedText) return "";

  password = password.toString();
  try {
    const key = crypto.createHash("sha256").update(password).digest();
    const parts = encryptedText.split(":");
    const iv = Buffer.from(parts[0], "hex");
    const encrypted = Buffer.from(parts[1], "hex");

    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  } catch (error) {
    console.error("Decryption failed:", error);
    return "";
  }
}

async function loginStudents(registerNo, password) {
  console.log("kk");
  const student = await Student.findOne({ registerNo });

  if (student) {
    const decryptedPassword = decrypt(student.password, SECRET_KEY);
    if (password === decryptedPassword) {
      return student;
    }
  }

  return null;
}

async function resetPwd(phone, newPassword) {
  const encryptedPassword = encrypt(newPassword, SECRET_KEY);

  const updatedStudent = await Student.findOneAndUpdate(
    { phone },
    { password: encryptedPassword },
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

// need to change this to crypto
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
    await resetPwd(phone, newPassword);
  }

  return await Student.findByIdAndUpdate(id, updateData, { new: true });
}

// students will be archived not deleted
async function studentDelete(id) {
  const student = await Student.findById(id);

  if (!student) {
    throw new Error("Student not found");
  }

  // Toggle the archive field
  return await Student.findByIdAndUpdate(
    id,
    {
      $set: { archive: !student.archive },
    },
    { new: true }
  );
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
      .select("date _id goal review staffReference staffType startDate endDate")
      .populate("staffReference", "userName username") // Populate only the userName from Staff
      .sort({ createdAt: -1 });

    const secondaryAssessments = await SecondaryAssessment.find({
      studentReference: studentId,
    })
      .select("date _id goal review staffType staffReference startDate endDate")
      .populate("staffReference")
      .sort({ createdAt: -1 });

    const vocationalAssessments = await VocationalAssessment.find({
      studentReference: studentId,
    })
      .select("date _id goal review staffReference staffType startDate endDate")
      .populate("staffReference")
      .sort({ createdAt: -1 });

    const physioTherapyAssessments = await PhysioTherapyAssessment.find({
      studentReference: studentId,
    })
      .select("date _id goal review staffReference staffType startDate endDate")
      .populate("staffReference")
      .sort({ createdAt: -1 });

    const customAssessments = await CustomAssessment.find({
      studentReference: studentId,
    })
      .select("date _id goal review staffReference staffType startDate endDate")
      .populate("staffReference");

    const templateCaseRecords = await TemplateCaseRecord.find({
      studentReference: studentId,
    })
      .select("date _id goal review staffReference staffType startDate endDate")
      .populate("staffReference")
      .sort({ createdAt: -1 });

    const speechLanguageProfiles = await SpeechLanguageProfile.find({
      studentReference: studentId,
    })
      .select("date _id goal review staffReference staffType startDate endDate")
      .populate("staffReference")
      .sort({ createdAt: -1 });

    const selfHelpSkillAssessment = await SelfHelpSkillAssessment.find({
      studentReference: studentId,
    })
      .select("date _id goal review staffReference staffType startDate endDate")
      .populate("staffReference")
      .sort({ createdAt: -1 });

    const homePrograms = await HomeProgram.find({
      studentReference: studentId,
    })
      .select("date _id goal review staffReference staffType startDate endDate")
      .populate("staffReference")
      .sort({ createdAt: -1 });

    // Combine all assessments into a single array

    const assessments = [
      ...primaryAssessments.map((assessment) => ({
        branch: "primary",
        id: assessment._id,
        goal: assessment.goal,
        review: assessment.review,
        date: assessment.date,
        userName: assessment.staffReference?.userName || null,
        startDate: assessment.startDate,
        endDate: assessment.endDate,
      })),
      ...secondaryAssessments.map((assessment) => ({
        branch: "secondary",
        id: assessment._id,
        goal: assessment.goal,
        review: assessment.review,
        date: assessment.date,
        userName: assessment.staffReference.userName || null,
        startDate: assessment.startDate,
        endDate: assessment.endDate,
      })),
      ...vocationalAssessments.map((assessment) => ({
        branch: "vocational",
        id: assessment._id,
        goal: assessment.goal,
        review: assessment.review,
        date: assessment.date,
        userName: assessment.staffReference?.userName || null,
        startDate: assessment.startDate,
        endDate: assessment.endDate,
      })),
      ...physioTherapyAssessments.map((assessment) => ({
        branch: "physiotherapy",
        id: assessment._id,
        goal: assessment.goal,
        review: assessment.review,
        date: assessment.date,
        userName: assessment.staffReference?.userName || null,
        startDate: assessment.startDate,
        endDate: assessment.endDate,
      })),
      ...customAssessments.map((assessment) => ({
        branch: "custom",
        id: assessment._id,
        goal: assessment.goal,
        review: assessment.review,
        date: assessment.date,
        userName: assessment.staffReference?.userName || null,
        startDate: assessment.startDate,
        endDate: assessment.endDate,
      })),
      ...selfHelpSkillAssessment.map((assessment) => ({
        branch: "selfhelp",
        id: assessment._id,
        goal: assessment.goal,
        review: assessment.review,
        date: assessment.date,
        userName: assessment.staffReference?.userName || null,
        startDate: assessment.startDate,
        endDate: assessment.endDate,
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
    select: "_id registerNo name level gender phone archive",
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
