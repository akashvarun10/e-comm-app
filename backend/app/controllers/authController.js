// controllers/authController.js
const authService = require("../services/authService");

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await authService.registerUser(email, password);
    res.status(200).json({ message: "User registered successfully", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await authService.loginUser(email, password);
    res.status(200).json({ message: "Login successful", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
