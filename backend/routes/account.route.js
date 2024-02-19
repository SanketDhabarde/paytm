const express = require("express");
const { getUserBalance } = require("../handlers/account.handler");
const router = express.Router();

router.route("/balance").get(getUserBalance);

module.exports = router;
