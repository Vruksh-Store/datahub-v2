const activityService = require("../services/activityService");

async function createActivity(req, res) {
  try {
    const admin = await activityService.createActivity(req.body);
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  createActivity,
};
