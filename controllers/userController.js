const User = require("../models/User");
const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(200).json({ users });
};
const getSingleUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById({ _id: userId });
  res.status(200).json({ user });
};
const showCurrentUser = () => {
  res.send("show user");
};
const updateUser = async (req, res) => {
  res.send("update user");
};
const updateUserPassword = async (req, res) => {
  res.send("update user password");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
