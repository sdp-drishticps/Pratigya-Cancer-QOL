import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/db/mongoose";
import bcrypt from "bcryptjs";

async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { fullName, email, phoneNumber, password, confirmPassword } = body;

    // Validation

    if (!fullName || !email || !phoneNumber || !password || !confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 },
      );
    }

    // Password Match

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Passwords do not match",
        },
        { status: 400 },
      );
    }

    // Existing User

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists with this email",
        },
        { status: 409 },
      );
    }

    // Hash Password

    const hashedPassword = await hashPassword(password);

    // Create User

    const user = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
