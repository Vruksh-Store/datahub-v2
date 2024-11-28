const teachingLearningMaterialService = require('../services/teachingLearningMaterialService');

// Create Teaching Learning Material
const createMaterial = async (req, res) => {
  try {
    const materialData = req.body; // Assuming the request body contains the material data
    const newMaterial = await teachingLearningMaterialService.createTeachingLearningMaterial(materialData);
    res.status(201).json({ success: true, data: newMaterial });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all Teaching Learning Materials
const getAllMaterials = async (req, res) => {
    console.log('hi')
  try {
    const materials = await teachingLearningMaterialService.getAllTeachingLearningMaterials();
    console.log(materials)
    res.status(200).json({ success: true, data: materials });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get a single Teaching Learning Material by ID
const getMaterialById = async (req, res) => {
  try {
    const material = await teachingLearningMaterialService.getTeachingLearningMaterialById(req.params.id);
    if (!material) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }
    res.status(200).json({ success: true, data: material });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update a Teaching Learning Material
const updateMaterial = async (req, res) => {
  try {
    const updatedMaterial = await teachingLearningMaterialService.updateTeachingLearningMaterial(req.params.id, req.body);
    if (!updatedMaterial) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }
    res.status(200).json({ success: true, data: updatedMaterial });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Teaching Learning Material
const deleteMaterial = async (req, res) => {
  try {
    const deletedMaterial = await teachingLearningMaterialService.deleteTeachingLearningMaterial(req.params.id);
    if (!deletedMaterial) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }
    res.status(200).json({ success: true, message: 'Material deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createMaterial,
  getAllMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
};
