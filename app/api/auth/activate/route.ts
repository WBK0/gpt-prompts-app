import ActivationToken from "@models/activationToken";
import User from "@models/user";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { token } = (await req.json()) as {
      token: string;
    };  
  
    const activationId = await ActivationToken.findOneAndDelete({ token: token });
  
    const user = await User.findOne({ email: activationId.email });
  
    user.isActive = true;
  
    await user.save();
  
    return new NextResponse(
      JSON.stringify({
        body: token  
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