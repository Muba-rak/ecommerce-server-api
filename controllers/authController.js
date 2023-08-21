const User = require("../models/User");
const handleError = require("../errors/handleerrors");
const { attachCookieToResponse } = require("../utils/jwt");
const register = async (req, res) => {
  const { role, name, email, password } = req.body;
  try {
    //first user as admin
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? "admin" : "user";

    const user = await User.create({ name, email, password, role });
    const tokenUser = {
      userId: user._id,
      name: user.name,
      role: user.role,
    };
    attachCookieToResponse({ res, user: tokenUser });
    res.status(201).json({
      user: { userId: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    console.log(error);
    const errors = handleError(error);
    res.status(400).json(errors);
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw Error("fill");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw Error("no user");
    }

    const isCorrect = await user.comparePassword(password);
    if (!isCorrect) {
      throw Error("wrong");
    }
    const tokenUser = {
      userId: user._id,
      name: user.name,
      role: user.role,
    };
    attachCookieToResponse({ res, user: tokenUser });
    res.status(201).json({
      user: { userId: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    console.log(error);
    const errors = handleError(error);
    res.status(400).json(errors);
  }
};
const logout = async (req, res) => {
  res.cookie("token", "random", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: "log out" });
};
module.exports = { register, login, logout };
