import express from "express";
import db from "@repo/db/client";

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  const { token, user_indentifier, amount } = req.body;
  //TODO: Add zod validation here?
  //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
  const paymentInformation: { token: string; userId: string; amount: string } =
    {
      token: token,
      userId: user_indentifier,
      amount: amount,
    };

  try {
    await db.$transaction([
      db.balance.update({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      db.onRampTransection.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    return res.json({
      message: "Captured",
    });
  } catch (error) {
    console.log(error);
    return res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(port, () => {
  console.log(`app started at port ${port}`);
});
