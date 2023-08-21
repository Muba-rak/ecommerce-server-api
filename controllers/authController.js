const User = require("../models/User");
const handleError = require("../errors/handleerrors");
const jwt = require("jsonwebtoken");
const { createToken } = require("../utils/jwt");
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
    const token = createToken({ payload: tokenUser });
    res.status(201).json({
      user: { userId: user._id, name: user.name, role: user.role },
      token,
    });
  } catch (error) {
    console.log(error);
    const errors = handleError(error);
    res.status(400).json(errors);
  }
};
const login = async (req, res) => {
  res.send("login user");
};
const logout = async (req, res) => {
  res.send("logout user");
};
module.exports = { register, login, logout };
