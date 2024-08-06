"use server";
import { getServerSession } from "next-auth";
import { authConfig } from "../auth";
import db from "@repo/db/client";

export const p2pTransfer = async (to: string, amount: number) => {
  const session = await getServerSession(authConfig);
  const from = session?.user?.id;
  if (!from) {
    return {
      message: "Error while sending",
    };
  }
  const toUser = await db.user.findFirst({
    where: {
      phone: to,
    },
  });

  if (!toUser) {
    return {
      message: "User not found",
    };
  }

  await db.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${Number(from)} FOR UPDATE`;

    const fromBalance = await tx.balance.findUnique({
      where: { userId: Number(from) },
    });
    if (!fromBalance || fromBalance.amount < amount) {
      throw new Error("Insufficient funds");
    }

    await tx.balance.update({
      where: { userId: Number(from) },
      data: { amount: { decrement: amount } },
    });

    await tx.balance.update({
      where: { userId: toUser.id },
      data: { amount: { increment: amount } },
    });

    await tx.p2pTransfer.create({
      data: {
        amount,
        timestamp: new Date(),
        fromUserId: Number(from),
        toUserId: toUser.id,
      },
    });
  });
};
