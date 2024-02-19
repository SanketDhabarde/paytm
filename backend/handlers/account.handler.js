const { Account } = require("../schema/account.schema");
const mongoose = require("mongoose");

const getUserBalance = async (req, res) => {
  const userId = req.userId;
  try {
    const userAcc = await Account.findOne({ userId });
    if (!userAcc) {
      return res.status(411).json({ error: "User does not exists" });
    }
    return res.json({ balance: userAcc.balance });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const transferMoney = async (req, res) => {
  const session = await mongoose.startSession();

  await session.startTransaction();
  const userId = req.userId;
  const { to, amount } = req.body;
  try {
    const userAcc = await Account.findOne({ userId }).session(session);
    if (!userAcc) {
      return res.status(411).json({ error: "User does not exists" });
    }

    if (userAcc && userAcc.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    const sender = await Account.findOne({ userId: to }).session(session);

    if (!sender) {
      return res.status(400).json({ error: "Invalid account" });
    }

    await Account.findOneAndUpdate(
      { userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.findOneAndUpdate(
      { userId: sender.userId },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();
    return res.json({ message: "Transfer successful" });
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  } finally {
    await session.endSession();
  }
};

module.exports = { getUserBalance, transferMoney };
