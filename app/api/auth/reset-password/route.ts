import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db/mongoose";
import { verifyResetToken } from "@/lib/mail/forgotPassword";

import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Token and password are required.",
        },
        {
          status: 400,
        },
      );
    }

    // Strong password validation
    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

    if (!strongPassword.test(password)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password must be at least 6 characters and include uppercase, lowercase, number and special character.",
        },
        {
          status: 400,
        },
      );
    }

    // ── Step 1: Unsafe peek to extract userId ────────────────────────────
    // jwt.decode() does NOT verify the signature — we only use this to look
    // up the user's current password hash so we can build the token secret.
    // We do NOT trust this userId for any auth decision yet.
    const unverifiedPayload = jwt.decode(token) as { userId?: string } | null;

    if (!unverifiedPayload?.userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired reset link.",
        },
        {
          status: 401,
        },
      );
    }

    // ── Step 2: Fetch user by the peeked userId ──────────────────────────
    // We need the stored password hash to reconstruct the token secret.
    const user = await User.findById(unverifiedPayload.userId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired reset link.",
        },
        {
          status: 401,
        },
      );
    }

    // ── Step 3: Cryptographically verify the token ───────────────────────
    // verifyResetToken calls jwt.verify() using (JWT_SECRET + passwordHash)
    // as the secret. This is the REAL auth gate:
    //   • Validates the signature — forged tokens are rejected here.
    //   • Validates expiry (15 min window).
    //   • Invalidates the link automatically once the password changes
    //     (because the hash changes, making the old secret wrong).
    let verifiedPayload: { userId: string };

    try {
      verifiedPayload = verifyResetToken(token, user.password) as {
        userId: string;
      };
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired reset link.",
        },
        {
          status: 401,
        },
      );
    }

    // ── Step 4: Trust only the verified payload from here on ─────────────
    // Paranoia check: the peeked userId and verified userId must match.
    // At this point verifiedPayload.userId is cryptographically guaranteed
    // to be the same user whose password hash was used to sign the token.
    if (verifiedPayload.userId !== String(user._id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired reset link.",
        },
        {
          status: 401,
        },
      );
    }

    // ── Step 5: Prevent reuse of the same password ───────────────────────
    const isSamePassword = await bcrypt.compare(password, user.password);

    if (isSamePassword) {
      return NextResponse.json(
        {
          success: false,
          message: "New password cannot be the same as the current password.",
        },
        {
          status: 400,
        },
      );
    }

    // ── Step 6: Hash and save the new password ───────────────────────────
    // Changing the password hash also invalidates all outstanding reset links
    // for this user automatically (old secret = JWT_SECRET + old hash).
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Password has been reset successfully.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Reset Password Error:", error);

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
