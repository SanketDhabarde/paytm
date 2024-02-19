const express = require("express");
const router = express.Router();

const userRouter = require("./user.route");
const accountRouter = require("./account.route");
const { authVerify } = require("../middlewares/authVerify.middleware");

router.use("/user", userRouter);
router.use("/account", authVerify, accountRouter);

module.exports = router;
