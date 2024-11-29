const { BasicDetails } = require('../models/models')
const Student = require('../models/models')

// Create basic details for a student
async function createBasicDetails(studentId, staffType, staffReference, answers) {
  // Check if a basic details document already exists for this student
  const existingDetails = await BasicDetails.findOne({ studentReference: studentId });
  if (existingDetails) {
    throw new Error('Basic details already exist for this student');
  }

  const basicDetails = new BasicDetails({
    studentReference: studentId,
    staffType,
    staffReference,
    answers,
  });

  return await basicDetails.save();
}

// Get basic details for a student
async function getBasicDetails(studentId) {
  const basicDetails = await BasicDetails.findOne({ studentReference: studentId }).populate('answers.questionId');
  if (!basicDetails) {
    throw new Error('No basic details found for this student');
  }
  return basicDetails;
}

// Update basic details for a student
async function updateBasicDetails(studentId, staffType, staffReference, answers) {
  const basicDetails = await BasicDetails.findOneAndUpdate(
    { studentReference: studentId },
    { staffType, staffReference, answers },
    { new: true }
  );
  if (!basicDetails) {
    throw new Error('No basic details found for this student');
  }
  return basicDetails;
}

// Delete basic details for a student
async function deleteBasicDetails(studentId) {
  const basicDetails = await BasicDetails.findOneAndDelete({ studentReference: studentId });
  if (!basicDetails) {
    throw new Error('No basic details found for this student');
  }
  return basicDetails;
}

module.exports = {
  createBasicDetails,
  getBasicDetails,
  updateBasicDetails,
  deleteBasicDetails,
};
