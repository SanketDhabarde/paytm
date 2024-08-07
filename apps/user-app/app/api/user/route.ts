import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "../../../lib/auth";

export const GET = async () => {
  const user = await getServerSession(authConfig);
  return NextResponse.json({
    user,
  });
};
