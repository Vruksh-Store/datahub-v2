const { TeachingLearningMaterial } = require('../models/models')

// Create a new Teaching Learning Material
const createTeachingLearningMaterial = async (data) => {
  try {
    const newMaterial = new TeachingLearningMaterial(data);
    return await newMaterial.save();
  } catch (error) {
    throw new Error('Error creating teaching material: ' + error.message);
  }
};

// Get all Teaching Learning Materials
const getAllTeachingLearningMaterials = async () => {
  try {
    return await TeachingLearningMaterial.find() // Populate userId with userName from Staff collection
  } catch (error) {
    throw new Error('Error fetching materials: ' + error.message);
  }
};

// Get a single Teaching Learning Material by ID
const getTeachingLearningMaterialById = async (id) => {
  try {
    return await TeachingLearningMaterial.findById(id).populate('userId', 'userName');
  } catch (error) {
    throw new Error('Error fetching material by ID: ' + error.message);
  }
};

// Update Teaching Learning Material
const updateTeachingLearningMaterial = async (id, data) => {
  try {
    return await TeachingLearningMaterial.findByIdAndUpdate(id, data, { new: true }).populate('userId', 'userName');
  } catch (error) {
    throw new Error('Error updating material: ' + error.message);
  }
};

// Delete Teaching Learning Material
const deleteTeachingLearningMaterial = async (id) => {
  try {
    return await TeachingLearningMaterial.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting material: ' + error.message);
  }
};

module.exports = {
  createTeachingLearningMaterial,
  getAllTeachingLearningMaterials,
  getTeachingLearningMaterialById,
  updateTeachingLearningMaterial,
  deleteTeachingLearningMaterial,
};
