import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "@/models/User";
import { connectDB } from "@/lib/db/mongoose";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and Password are required",
        },
        { status: 400 },
      );
    }

    // Find User
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      );
    }

    // Compare Password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      );
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      },
    );

    // Response
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
        },
      },
      { status: 200 },
    );

    // HTTP Only Cookie
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 1, // 1 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
