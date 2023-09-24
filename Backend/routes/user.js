const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  updateUserBasicInfo,
  updateUserAdditionalInfo,
  updateAllUserInformation,
  findOnlineUser,
  getAllUsers,
  getSingleUser,
  addFriend,
  addFollower,
} = require("../controllers/user");

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/online").post(findOnlineUser);
router.route("/").get(getAllUsers);
router.route("/:id").patch(updateUserBasicInfo).get(getSingleUser);
router.route("/addtionalinfo/:id").patch(updateUserAdditionalInfo);
router.route("/allupdate/:id").patch(updateAllUserInformation);
router.route("/addfriend/:id").patch(addFriend);
router.route("/follow/:id").patch(addFollower);

module.exports = router;
