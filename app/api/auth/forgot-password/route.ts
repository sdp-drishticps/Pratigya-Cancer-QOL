import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db/mongoose";

import User from "@/models/User";

import { generateResetToken } from "@/lib/mail/forgotPassword";
import { forgotPasswordTemplate } from "@/lib/mail/mailTemplates";
import { sendEmail } from "@/lib/mail/sendEmail";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        {
          status: 400,
        },
      );
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "No account found with this email address.",
        },
        {
          status: 404,
        },
      );
    }

    const resetToken = generateResetToken(user._id.toString(), user.password);

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Reset Your Password",
      html: forgotPasswordTemplate(user.fullName, resetLink),
    });

    return NextResponse.json({
      success: true,
      message: "Password reset link has been sent to your registered email.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
