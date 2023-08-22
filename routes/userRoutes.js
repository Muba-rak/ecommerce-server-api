const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  updateUserPassword,
  showCurrentUser,
} = require("../controllers/userController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/auth");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllUsers);

router.route("/showme").get(authenticateUser, showCurrentUser);
router.route("/updateuser").patch(authenticateUser, updateUser);
router.route("/updatepassword").patch(authenticateUser, updateUserPassword);

router.route("/:userId").get(authenticateUser, getSingleUser);
module.exports = router;
