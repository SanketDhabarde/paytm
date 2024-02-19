const express = require("express");
const {
  getUserBalance,
  transferMoney,
} = require("../handlers/account.handler");
const router = express.Router();

router.route("/balance").get(getUserBalance);
router.route("/transfer").post(transferMoney);

module.exports = router;
