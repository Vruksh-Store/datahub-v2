const { Activity } = require("../models/models");

async function createActivity(data) {
  const activity = new Activity(data);
  return await activity.save();
}

const getActivities = async (admin, userId) => {
  try {
    if (admin) {
      const allActivities = await Activity.find().sort({ createdAt: -1 });

      const adminActivities = allActivities.filter(
        (activity) =>
          activity.userName === "adminadmin" ||
          activity.userName === "SHANTHI RAMESH"
      );

      const userActivities = allActivities.filter(
        (activity) =>
          activity.userName !== "adminadmin" &&
          activity.userName !== "SHANTHI RAMESH"
      );

      return {
        adminActivities,
        userActivities,
      };
    } else {
      const userActivities = await Activity.find({ userId }).sort({
        createdAt: -1,
      });
      return {
        userActivities,
      };
    }
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw new Error("Failed to fetch activities");
  }
};

module.exports = {
  createActivity,
  getActivities,
};
