"use server";
import { getServerSession } from "next-auth";
import { authConfig } from "../auth";
import db from "@repo/db/client";

export const createOnrampTransection = async (
  amount: number,
  provider: string
) => {
  const session = await getServerSession(authConfig);
  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }
  try {
    await db.onRampTransection.create({
      data: {
        amount: amount * 100,
        provider,
        userId: Number(session?.user?.id),
        token: Math.random().toString(),
        startTime: new Date(),
        status: "Processing",
      },
    });

    return {
      message: "Transection added",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "failed to add transection",
    };
  }
};
