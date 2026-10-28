import jwt from "jsonwebtoken";

export function generateResetToken(userId: string, hashedPassword: string) {
  const secret = process.env.JWT_SECRET! + hashedPassword;

  return jwt.sign(
    {
      userId,
    },
    secret,
    {
      expiresIn: "15m",
    },
  );
}

export function verifyResetToken(token: string, hashedPassword: string) {
  const secret = process.env.JWT_SECRET! + hashedPassword;

  return jwt.verify(token, secret);
}
