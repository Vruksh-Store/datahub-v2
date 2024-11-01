// services/authService.js
const { Admin, Staff } = require("../models/models");
const bcrypt = require("bcrypt");

async function login(username, password) {
  let user = await Admin.findOne({ username });
  let userType = "admin";

  if (!user) {
    user = await Staff.findOne({ username });
    userType = "staff";
  }

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return { user, userType, token: user.password };
}

async function forgetPassword(username, newPassword) {
  let user = await Admin.findOne({ username });

  if (!user) {
    user = await Staff.findOne({ username });
  }

  if (!user) {
    throw new Error("User not found");
  }

  const salt = await bcrypt.genSalt(5);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  await user.save();

  return user;
}

module.exports = {
  login,
  forgetPassword,
};
