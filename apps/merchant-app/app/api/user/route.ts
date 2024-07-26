import { getServerSession } from "next-auth";
import { authConfig } from "../../../lib/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession(authConfig);
  console.log({session});

  if (session?.user) {
    return NextResponse.json({
      user: session.user,
    });
  }

  return NextResponse.json(
    {
      message: "You are not logged in!",
    },
    {
      status: 403,
    }
  );
};
