import db from "@repo/db/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  const user = await db.user.create({
    data: {
      email: "test@123",
      name: "test",
    },
  });

  return NextResponse.json({
    user: user,
  });
};
