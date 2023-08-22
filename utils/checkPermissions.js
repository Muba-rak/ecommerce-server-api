const checkPermissions = (requestUser, resourceUserId) => {
  //   console.log(requestUser);
  //   console.log(resourceUserId, typeof resourceUserId);
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  res.status(403).json({ messsage: "Unauthorized to access this route" });
};
module.exports = checkPermissions;
