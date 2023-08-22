const { istokenValid } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    return res.status(401).json({ message: "Auth failed" });
  }
  try {
    const { name, role, userId } = istokenValid({ token });
    req.user = { userId, name, role };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Auth failed" });
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Unauthorized to access route" });
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
