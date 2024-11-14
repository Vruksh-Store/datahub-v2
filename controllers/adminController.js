const adminService = require("../services/adminService");

async function createAdmin(req, res) {
  try {
    const admin = await adminService.createAdmin(req.body);
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function createStaff(req, res) {
  try {
    const staff = await adminService.createStaff(req.body);
    res.status(201).json(staff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateStaff(req, res) {
  try {
    const updatedStaff = await adminService.updateStaff(
      req.params.id,
      req.body
    );
    res.json(updatedStaff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteStaff(req, res) {
  try {
    await adminService.deleteStaff(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getStaffs(req, res) {
  try {
    const staffs = await adminService.getStaffs();
    res.json(staffs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getStudents(req, res) {
  try {
    const students = await adminService.getStudents();
    res.json(students);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function addStudents(req, res) {
  console.log(1);
  const staffId = req.body.staffId;
  const studentId = req.body.studentId;
  try {
    const response = await adminService.addStudents(staffId, studentId);
    console.log(response);
    res.json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function removeStudents(req, res) {
  console.log(3);
  const staffId = req.body.staffId;
  const studentId = req.body.studentId;
  try {
    const response = await adminService.removeStudents(staffId, studentId);
    console.log(response);
    res.json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  createAdmin,
  createStaff,
  updateStaff,
  deleteStaff,
  getStaffs,
  getStudents,
  addStudents,
  removeStudents
};
