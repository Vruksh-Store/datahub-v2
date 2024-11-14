const { Activity } = require("../models/models");

async function createActivity(data) {
  const activity = new Activity(data);
  return await activity.save();
}

module.exports = {
  createActivity,
};
