const authService = require("../services/authService");

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const { user, userType, token } = await authService.login(
      username,
      password
    );
    res.json({ message: "Login successful", user, userType, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function forgetPassword(req, res) {
  try {
    const { username, newPassword } = req.body;
    const updatedUser = await authService.forgetPassword(username, newPassword);
    res.json({ message: "Password updated successfully", updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  login,
  forgetPassword,
};
