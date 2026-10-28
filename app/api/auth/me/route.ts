import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import User from "@/models/User";
import { connectDB } from "@/lib/db/mongoose";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      email: string;
    };

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Me API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Invalid token",
      },
      { status: 401 },
    );
  }
}
