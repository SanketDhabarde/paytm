const express = require("express");
const {
  signUp,
  signIn,
  updateUser,
  findUser,
} = require("../handlers/user.handler");
const { authVerify } = require("../middlewares/authVerify.middleware");
const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/bulk").get(findUser);
router.put("/", authVerify, updateUser);

module.exports = router;
