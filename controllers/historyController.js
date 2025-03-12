const historyService = require("../services/historyService");

const createHistory = async (req, res) => {
  try {
    const { userId, studentId, activity, type, model } = req.body;

    if (!userId || !studentId || !type || !model) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const history = await historyService.createHistory({
      userId,
      studentId,
      activity,
      type,
      model,
    });

    return res.status(201).json(history);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const { staffId, type, model } = req.query;

    if (!staffId || !type || !model) {
      return res
        .status(400)
        .json({ message: "Missing required query parameters" });
    }

    const history = await historyService.getHistory(staffId, type, model);

    return res.status(200).json(history);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createHistory, getHistory };
