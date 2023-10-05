import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import ResetPasswordToken from "@models/resetPasswordToken";
import User from "@models/user";
import { compare, hash } from "bcryptjs";
import sendConfirmationResetPassword from "@utils/sendConfirmationResetPassword";

export async function POST(req: Request) {
  try {
    await connectToDB();
    
    const { token, password, passwordConfirmation } = (await req.json()) as {
      token: string;
      password: string;
      passwordConfirmation: string;
    };

    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/g.test(password)){
      return new NextResponse(JSON.stringify("Password must contain at least one uppercase letter, one lowercase letter and one number"), { status: 400 });
    }else if(password !== passwordConfirmation){
      return new NextResponse(JSON.stringify("Passwords do not match"), { status: 400 });
    }

    const resetToken = await ResetPasswordToken.findOne({ token: token });

    const user = await User.findOne({ email: resetToken?.email });

    if(await compare(password, user?.password)){
      return new NextResponse(JSON.stringify("You can't use your previous password as new password"), { status: 400 });
    }

    await ResetPasswordToken.deleteOne({ token: token });

    if(!resetToken){
      return new NextResponse(JSON.stringify("You provided wrong token or it has expired"), { status: 400 });
    }
    
    const hashed_password = await hash(password, 12);

    await User.findOneAndUpdate({email: resetToken?.email}, {password: hashed_password, updatedAt: Date.now()});

    const isMailSended = await sendConfirmationResetPassword(resetToken?.email);
    
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
