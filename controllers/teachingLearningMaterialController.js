// const teachingLearningMaterialService = require('../services/teachingLearningMaterialService');

// // Create Teaching Learning Material
// const createMaterial = async (req, res) => {
//   try {
//     const materialData = req.body; // Assuming the request body contains the material data
//     const newMaterial = await teachingLearningMaterialService.createTeachingLearningMaterial(materialData);
//     res.status(201).json({ success: true, data: newMaterial });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// // Get all Teaching Learning Materials
// const getAllMaterials = async (req, res) => {
//     console.log('hi')
//   try {
//     const materials = await teachingLearningMaterialService.getAllTeachingLearningMaterials();
//     console.log(materials)
//     res.status(200).json({ success: true, data: materials });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// // Get a single Teaching Learning Material by ID
// const getMaterialById = async (req, res) => {
//   try {
//     const material = await teachingLearningMaterialService.getTeachingLearningMaterialById(req.params.id);
//     if (!material) {
//       return res.status(404).json({ success: false, message: 'Material not found' });
//     }
//     res.status(200).json({ success: true, data: material });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// // Update a Teaching Learning Material
// const updateMaterial = async (req, res) => {
//   try {
//     const updatedMaterial = await teachingLearningMaterialService.updateTeachingLearningMaterial(req.params.id, req.body);
//     if (!updatedMaterial) {
//       return res.status(404).json({ success: false, message: 'Material not found' });
//     }
//     res.status(200).json({ success: true, data: updatedMaterial });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// // Delete Teaching Learning Material
// const deleteMaterial = async (req, res) => {
//   try {
//     const deletedMaterial = await teachingLearningMaterialService.deleteTeachingLearningMaterial(req.params.id);
//     if (!deletedMaterial) {
//       return res.status(404).json({ success: false, message: 'Material not found' });
//     }
//     res.status(200).json({ success: true, message: 'Material deleted successfully' });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// module.exports = {
//   createMaterial,
//   getAllMaterials,
//   getMaterialById,
//   updateMaterial,
//   deleteMaterial,
// };

// const TeachingLearningMaterial = require("../models/teachingLearningMaterial");
const { TeachingLearningMaterial } = require("../models/models");
const asyncHandler = require("express-async-handler");

// Get all materials
const getAllMaterials = asyncHandler(async (req, res) => {
  const materials = await TeachingLearningMaterial.find()
    .populate("userId", "userName") // Populate the userId field with userName
    .sort({ createdAt: -1 }); // Sort by createdAt in descending order (newest first)

  res.status(200).json({ data: materials });
});

// Create a new material entry with multiple materials
const createMaterial = asyncHandler(async (req, res) => {
  const { userName, userId, materials } = req.body;
  const materialEntry = await TeachingLearningMaterial.create({
    userName,
    userId,
    materials,
  });
  res.status(201).json({ data: materialEntry });
});

// Update a material entry (add, edit, or delete materials in the array)
const updateMaterial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { materials } = req.body;
  const materialEntry = await TeachingLearningMaterial.findByIdAndUpdate(
    id,
    { materials },
    { new: true }
  );
  res.status(200).json({ data: materialEntry });
});

// Delete a material entry
const deleteMaterial = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Retrieve the current material to know its archive status
  const material = await TeachingLearningMaterial.findById(id);
  if (!material) {
    return res.status(404).json({ message: "Material not found" });
  }

  // Toggle the current archive status
  const updatedMaterial = await TeachingLearningMaterial.findByIdAndUpdate(
    id,
    { archieved: !material.archieved },
    { new: true } // Return the updated document
  );

  res.status(200).json({
    message: material.archieved
      ? "Material recovered successfully"
      : "Material archived successfully",
    data: updatedMaterial,
  });
});

module.exports = {
  getAllMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
};
