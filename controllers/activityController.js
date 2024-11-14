const activityService = require("../services/activityService");

async function createActivity(req, res) {
  try {
    const admin = await activityService.createActivity(req.body);
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getActivities(req, res) {
  try {
    const activities = await activityService.getActivities(
      req.params.admin,
      req.params.userId
    );
    res.status(201).json(activities);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  createActivity,
  getActivities,
};
