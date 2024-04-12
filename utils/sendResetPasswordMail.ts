import transporter from "./nodemailer";
import crypto from "crypto";
import ResetPasswordToken from "@models/resetPasswordToken";

const sendResetPasswordMail = async (email : string) => {
  try {
    const resetPasswordToken = crypto.randomBytes(32).toString('hex');

    const newResetPasswordToken = new ResetPasswordToken({
      token: resetPasswordToken,
      email: email,
      expireAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
    });
    await newResetPasswordToken.save();

    await transporter.sendMail({
      from: 'no-reply@codebybartlomiej.pl',
      to: email,
      subject: 'Reset Password Request',
      html: `
      <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Password</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f2f2f2;
                }
                .container {
                    text-align: center;
                    padding: 40px;
                }
                h1 {
                    color: #007BFF;
                }
                p {
                    font-size: 16px;
                }
                a.button {
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #007BFF;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 4px;
                }
                img.logo {
                    max-width: 200px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img src="http://localhost:3002/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.a765e515.png&w=96&q=77" alt="Your Logo" class="logo">
                <h1>Reset Password</h1>
                <p>You have requested to reset your password. Please click the button below to reset your password:</p>
                <a href="${process.env.NEXT_URL}/auth/reset-password?token=${resetPasswordToken}" class="button">Reset Password</a>
                <p>If you didn't request a password reset, you can safely ignore this message.</p>
            </div>
        </body>
      </html>
      `,
    });
    return true;
  } catch (error) {
    console.log(error)
    return false;
  }
}

export default sendResetPasswordMail;