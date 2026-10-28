export function forgotPasswordTemplate(
  fullName: string,
  resetLink: string,
) {
  return `
<!DOCTYPE html>
<html>

<body style="font-family:Arial,sans-serif;background:#f4f6f9;padding:30px">

<div style="max-width:600px;margin:auto;background:white;border-radius:10px;padding:30px">

<h2 style="color:#1E285D">
Reset Your Password
</h2>

<p>
Hello <strong>${fullName}</strong>,
</p>

<p>
We received a request to reset your password for your AIIMS Bhopal account.
</p>

<p>
Click the button below to reset your password.
</p>

<div style="margin:30px 0">
<a
href="${resetLink}"
style="
background:#1E285D;
color:white;
padding:14px 28px;
text-decoration:none;
border-radius:6px;
display:inline-block;
">
Reset Password
</a>
</div>

<p>
This link will expire in
<strong>15 minutes.</strong>
</p>

<p>
If you didn't request this password reset, simply ignore this email.
</p>

<hr>

<p style="font-size:12px;color:#888">
AIIMS Bhopal
</p>

</div>

</body>
</html>
`;
}