const express = require('express');
const router = express.Router();
const basicDetailsController = require('../controllers/basicDetailsController'); // Adjust the path as necessary

// Route to create basic details for a student
router.post('/basicdetails', basicDetailsController.createBasicDetails);

// Route to get basic details for a student
router.get('/basicdetails/:studentId', basicDetailsController.getBasicDetails);

// Route to update basic details for a student
router.put('/basicdetails/:studentId', basicDetailsController.updateBasicDetails);

// Route to delete basic details for a student
router.delete('/basicdetails/:studentId', basicDetailsController.deleteBasicDetails);

module.exports = router;
