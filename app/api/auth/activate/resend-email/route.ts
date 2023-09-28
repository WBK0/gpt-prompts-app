import User from "@models/user";
import sendActiveAccountMail from "@utils/sendActiveAccountMail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as {
      email: string;
    };  

    const user = await User.findOne({ email: email });
  
    if(user.isActive){
      return new NextResponse(
        JSON.stringify({
          body: 'User is already active'  
        }),
        { status: 400 }
      );
    }

    const isMailSended = await sendActiveAccountMail(email);

    if(!isMailSended){
      return new NextResponse(
        JSON.stringify({
          body: 'Something went wrong'  
        }),
        { status: 500 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        body: 'Email has been sent'  
      }),
      { status: 200 }
    );

  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        'error': 'error'  
      }),
      { status: 500 }
    );
  }
  
} 