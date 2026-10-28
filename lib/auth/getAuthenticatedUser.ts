import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

import User from "@/models/User";

interface JwtPayload {
  userId: string;
}

export async function getAuthenticatedUser(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return {
      user: null,
      error: "Unauthorized",
      status: 401,
    };
  }

  let decoded: JwtPayload;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch {
    return {
      user: null,
      error: "Invalid or expired token",
      status: 401,
    };
  }

  if (!decoded.userId) {
    return {
      user: null,
      error: "Invalid token",
      status: 401,
    };
  }

  const user = await User.findById(decoded.userId).select("_id");

  if (!user) {
    return {
      user: null,
      error: "User not found",
      status: 404,
    };
  }

  return {
    user,
    error: null,
    status: 200,
  };
}
