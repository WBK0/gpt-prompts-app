import transporter from "./nodemailer";
import crypto from "crypto";
import ActivationToken from "@models/activationToken";

const sendActiveAccountMail = async (email : string) => {
  try {
    const activationToken = crypto.randomBytes(32).toString('hex');

    const newActivationToken = new ActivationToken({
      token: activationToken,
      email: email
    });
    await newActivationToken.save();

    await transporter.sendMail({
      from: 'no-reply@codebybartlomiej.pl',
      to: email,
      subject: 'Account activation',
      html: `
      <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Confirmation</title>
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
                <h1>Email Confirmation</h1>
                <p>Thank you for registering! Please click the button below to confirm your email address:</p>
                <a href="${process.env.NEXT_URL}/auth/activate?token=${activationToken}" class="button">Confirm Email</a>
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

export default sendActiveAccountMail;