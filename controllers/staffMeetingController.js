const staffMeetingService = require("../services/staffMeetingService");

// Create a Staff Meeting
const createMeeting = async (req, res) => {
  try {
    const meetingData = req.body; // Assuming the request body contains the meeting data
    const newMeeting = await staffMeetingService.createStaffMeeting(
      meetingData
    );
    res.status(201).json({ success: true, data: newMeeting });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all Staff Meetings
const getAllMeetings = async (req, res) => {
  try {
    const meetings = await staffMeetingService.getAllStaffMeetings();
    res.status(200).json({ success: true, data: meetings });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get a Staff Meeting by ID
const getMeetingById = async (req, res) => {
  try {
    const meeting = await staffMeetingService.getStaffMeetingById(
      req.params.id
    );
    if (!meeting) {
      return res
        .status(404)
        .json({ success: false, message: "Meeting not found" });
    }
    res.status(200).json({ success: true, data: meeting });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update a Staff Meeting
const updateMeeting = async (req, res) => {
  try {
    const updatedMeeting = await staffMeetingService.updateStaffMeeting(
      req.params.id,
      req.body
    );
    if (!updatedMeeting) {
      return res
        .status(404)
        .json({ success: false, message: "Meeting not found" });
    }
    res.status(200).json({ success: true, data: updatedMeeting });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a Staff Meeting
const deleteMeeting = async (req, res) => {
  try {
    const deletedMeeting = await staffMeetingService.deleteStaffMeeting(
      req.params.id
    );
    if (!deletedMeeting) {
      return res
        .status(404)
        .json({ success: false, message: "Meeting not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Meeting deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const editFreeze = async (req, res) => {
  try {
    const freezeMeeting = await staffMeetingService.freezeMeeting(
      req.params.id,
      req.body.isFreezed
    );
    if (!freezeMeeting) {
      return res
        .status(404)
        .json({ success: false, message: "Meeting not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Meeting Edited successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createMeeting,
  getAllMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
  editFreeze,
};
