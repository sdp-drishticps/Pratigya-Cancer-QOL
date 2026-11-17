import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface SendEmailProps {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({
  to,
  subject,
  html,
}: SendEmailProps) {
  await transporter.sendMail({
    from: `"AIIMS Bhopal" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}