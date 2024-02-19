const { Account } = require("../schema/account.schema");

const getUserBalance = async (req, res) => {
  const userId = req.userId;
  try {
    const userAcc = await Account.findOne({ userId });
    if (!userAcc) {
      return res.status(411).json({ error: "User does not exists" });
    }
    console.log(userAcc);
    return res.json({ balance: userAcc.balance });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { getUserBalance };
