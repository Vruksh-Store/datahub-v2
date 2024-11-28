const express = require('express');
const router = express.Router();
const staffMeetingController = require('../controllers/staffMeetingController');

// Create a new Staff Meeting
router.post('/', staffMeetingController.createMeeting);

// Get all Staff Meetings
router.get('/', staffMeetingController.getAllMeetings);

// Get a Staff Meeting by ID
router.get('/:id', staffMeetingController.getMeetingById);

// Update a Staff Meeting
router.put('/:id', staffMeetingController.updateMeeting);

// Delete a Staff Meeting
router.delete('/:id', staffMeetingController.deleteMeeting);

module.exports = router;
