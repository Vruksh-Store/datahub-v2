const { Admin, Staff } = require("../models/models");
const bcrypt = require("bcrypt");

async function createAdmin(data) {
  const salt = await bcrypt.genSalt(5);
  data.password = await bcrypt.hash(data.password, salt);
  const admin = new Admin(data);
  return await admin.save();
}

async function createStaff(data) {
  const salt = await bcrypt.genSalt(5);
  data.password = await bcrypt.hash(data.password, salt);

  const staff = new Staff(data);
  return await staff.save();
}

async function updateStaff(staffId, data) {
  if (data.password) {
    const salt = await bcrypt.genSalt(5);
    data.password = await bcrypt.hash(data.password, salt);
  }

  return await Staff.findByIdAndUpdate(staffId, data, { new: true });
}

async function deleteStaff(staffId) {
  return await Staff.findByIdAndDelete(staffId);
}

async function getStaffs() {
  return await Staff.find();
}

module.exports = {
  createAdmin,
  createStaff,
  updateStaff,
  deleteStaff,
  getStaffs,
};
