import { getServerSession } from "next-auth";
import { authConfig } from "../../../lib/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const user = await getServerSession(authConfig);
  return NextResponse.json({
    user,
  });
};
