const { History } = require("../models/models");

const createHistory = async (historyData) => {
  try {
    const history = new History(historyData);
    return await history.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getHistory = async (staffId, type, model) => {
  try {
    return await History.find({ userId: staffId, type, model })
      .populate("studentId")
      .lean()
      .sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createHistory, getHistory };
