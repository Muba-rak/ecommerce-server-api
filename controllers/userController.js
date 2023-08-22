const User = require("../models/User");
const handleError = require("../errors/handleerrors");
const createTokenUser = require("../utils/createTokenUser");
const { attachCookieToResponse } = require("../utils/jwt");
const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(200).json({ users });
};
const getSingleUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById({ _id: userId }).select("-password");
  res.status(200).json({ user });
};
const showCurrentUser = (req, res) => {
  res.status(200).json(req.user);
};
const updateUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    if (!name || !email) {
      throw Error("fill");
    }
    const user = await User.findByIdAndUpdate(
      { _id: req.user.userId },
      { name, email },
      { new: true, runValidators: true }
    );
    const tokenUser = createTokenUser(user);
    attachCookieToResponse({ res, user: tokenUser });
    res.status(201).json({ user: tokenUser });
  } catch (error) {
    console.log(error);
    const errors = handleError(error);
    res.status(400).json(errors);
  }
};
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    if (!oldPassword || !newPassword) {
      throw Error("fill");
    }

    const user = await User.findById({ _id: req.user.userId });

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      throw Error("no match");
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({ success: true, msg: "password updated" });
  } catch (error) {
    console.log(error);
    const errors = handleError(error);
    res.status(400).json(errors);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
