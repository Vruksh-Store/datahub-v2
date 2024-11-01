const { Admin, Staff, Student } = require("../models/models");

const checkIfExist = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Authorization token is required",
    });
  }
  try {
    const user =
      (await Admin.findOne({ password: token })) ||
      (await Staff.findOne({ password: token })) ||
      (await Student.findOne({ password: token }));

    if (!user) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = checkIfExist;
