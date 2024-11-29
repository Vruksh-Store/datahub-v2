const basicDetailsService = require('../services/basicDetailsService'); // Adjust the path as necessary

// Controller to create basic details for a student
async function createBasicDetails(req, res) {
  try {
    const { studentId, staffType, staffReference, answers } = req.body;
    const basicDetails = await basicDetailsService.createBasicDetails(studentId, staffType, staffReference, answers);
    res.status(201).json(basicDetails);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Controller to get basic details for a student
async function getBasicDetails(req, res) {
  try {
    const { studentId } = req.params;
    const basicDetails = await basicDetailsService.getBasicDetails(studentId);
    res.status(200).json(basicDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// Controller to update basic details for a student
async function updateBasicDetails(req, res) {
  try {
    const { studentId } = req.params;
    const { staffType, staffReference, answers } = req.body;
    const basicDetails = await basicDetailsService.updateBasicDetails(studentId, staffType, staffReference, answers);
    res.status(200).json(basicDetails);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Controller to delete basic details for a student
async function deleteBasicDetails(req, res) {
  try {
    const { studentId } = req.params;
    const basicDetails = await basicDetailsService.deleteBasicDetails(studentId);
    res.status(200).json({ message: 'Basic details deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports = {
  createBasicDetails,
  getBasicDetails,
  updateBasicDetails,
  deleteBasicDetails,
};
