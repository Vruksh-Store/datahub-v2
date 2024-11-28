const { StaffMeeting } = require('../models/models'); // Assuming the model is stored here

// Create a new Staff Meeting
const createStaffMeeting = async (data) => {
    console.log(data)
  try {
    const newMeeting = new StaffMeeting(data);
    return await newMeeting.save();
  } catch (error) {
    console.log(error.message)
    throw new Error('Error creating staff meeting: ' + error.message);
  }
};

// Get all Staff Meetings
const getAllStaffMeetings = async () => {
  try {
    return await StaffMeeting.find().populate('userId', 'userName'); // Populate userId with userName from Staff collection
  } catch (error) {
    throw new Error('Error fetching meetings: ' + error.message);
  }
};

// Get a single Staff Meeting by ID
const getStaffMeetingById = async (id) => {
  try {
    return await StaffMeeting.findById(id).populate('userId', 'userName');
  } catch (error) {
    throw new Error('Error fetching meeting by ID: ' + error.message);
  }
};

// Update a Staff Meeting
const updateStaffMeeting = async (id, data) => {
  try {
    return await StaffMeeting.findByIdAndUpdate(id, data, { new: true }).populate('userId', 'userName');
  } catch (error) {
    throw new Error('Error updating meeting: ' + error.message);
  }
};

// Delete a Staff Meeting
const deleteStaffMeeting = async (id) => {
  try {
    return await StaffMeeting.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting meeting: ' + error.message);
  }
};

module.exports = {
  createStaffMeeting,
  getAllStaffMeetings,
  getStaffMeetingById,
  updateStaffMeeting,
  deleteStaffMeeting,
};
