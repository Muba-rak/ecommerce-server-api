const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  updateUserPassword,
  showCurrentUser,
} = require("../controllers/userController");

router.route("/").get(getAllUsers);
router.route("/:userId").get(getSingleUser);
module.exports = router;
