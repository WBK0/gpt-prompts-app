import User from "@models/user";
import { connectToDB } from "@utils/database";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import crypto from "crypto";
import transporter from "@utils/nodemailer";
import ActivationToken from "@models/activationToken";
import logo from "@assets/logo.png";

export async function POST(req: Request) {
  try {
    await connectToDB();
    
    const { firstname, lastname, email, password } = (await req.json()) as {
      firstname: string;
      lastname: string;
      email: string;
      password: string;
    };

    if(!firstname || !lastname || !email || !password){
      return new NextResponse(JSON.stringify("Please fill in all fields"), { status: 400 });
    }
    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/g.test(password)){
      return new NextResponse(JSON.stringify("Password must contain at least one uppercase letter, one lowercase letter and one number"), { status: 400 });
    }
    if(!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(firstname) || !/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(lastname)){
      return new NextResponse(JSON.stringify("First and last name must contain only letters"), { status: 400 });
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(email)){
      return new NextResponse(JSON.stringify("Please enter a valid email"), { status: 400 });
    }

    const hashed_password = await hash(password, 12);

    const activationToken = crypto.randomBytes(32).toString('hex');

    console.log(activationToken)

    const newUser = new User({ 
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashed_password
     });

     const newAcivationToken = new ActivationToken({
      token: activationToken,
      email: email
    });

    await newAcivationToken.save();

    await transporter.sendMail({
      from: 'no-reply@codebybartlomiej.pl',
      to: email,
      subject: 'Aktywacja konta',
      html: `
      <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Confirmation</title>
            <style>
                /* Dodanie stylu dla czcionki */
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

    const user = await newUser.save();

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      },
      test: 'test'
    });

  } catch (error: any) {
    console.log(error)
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
