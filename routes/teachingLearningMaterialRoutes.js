// const express = require('express');
// const router = express.Router();
// const teachingLearningMaterialController = require('../controllers/teachingLearningMaterialController');

// // Create a new Teaching Learning Material
// router.post('/', teachingLearningMaterialController.createMaterial);

// // Get all Teaching Learning Materials
// router.get('/', teachingLearningMaterialController.getAllMaterials);

// // Get a single Teaching Learning Material by ID
// router.get('/:id', teachingLearningMaterialController.getMaterialById);

// // Update Teaching Learning Material
// router.put('/:id', teachingLearningMaterialController.updateMaterial);

// // Delete Teaching Learning Material
// router.delete('/:id', teachingLearningMaterialController.deleteMaterial);

// module.exports = router;

const express = require('express');
const router = express.Router();
const teachingLearningMaterialController = require('../controllers/teachingLearningMaterialController');

// CRUD Routes
router.get('/', teachingLearningMaterialController.getAllMaterials);
router.post('/', teachingLearningMaterialController.createMaterial);
router.put('/:id', teachingLearningMaterialController.updateMaterial);
router.delete('/:id', teachingLearningMaterialController.deleteMaterial);

module.exports = router;
