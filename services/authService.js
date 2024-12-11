// services/authService.js
const { Admin, Staff } = require("../models/models");
const bcrypt = require("bcrypt");

async function login(username, password) {
  console.log(username);
  let user = await Admin.findOne({ userName: username });
  let userType = "admin";

  if (!user) {
    console.log(1);
    let findUser = await Staff.findOne({ userId: username });
    console.log(findUser);
    userType = findUser.role;
    user = findUser;
  }
  console.log("first");
  if (!user) {
    console.log(2);
    throw new Error("User not found");
  }

  console.log(user);
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
