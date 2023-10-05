import User from "@models/user";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import sendResetPasswordMail from "@utils/sendResetPasswordMail";
import ResetPasswordToken from "@models/resetPasswordToken";

export async function POST(req: Request) {
  try {
    await connectToDB();
    
    const { email } = (await req.json()) as {
      email: string;
    };

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(email)){
      return new NextResponse(JSON.stringify("Please enter a valid email"), { status: 400 });
    }

    const accountExists = await User.findOne({ email: email });

    await ResetPasswordToken.deleteMany({ email: email });

    if(!accountExists || !accountExists.isActive){
      return new NextResponse(JSON.stringify("We can't find account with that e-mail address"), { status: 400 });
    }

    const isMailSended = await sendResetPasswordMail(email);
    
    if(!isMailSended){
      return new NextResponse(JSON.stringify("Something went wrong"), { status: 500 });
    }

    return NextResponse.json({
      "success": "Email has been sent, now check your inbox and follow the instructions to reset your password"
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
