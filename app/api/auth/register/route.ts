import User from "@models/user";
import { connectToDB } from "@utils/database";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDB();
    
    const { firstname, lastname, email, password } = (await req.json()) as {
      firstname: string;
      lastname: string;
      email: string;
      password: string;
    };

    const hashed_password = await hash(password, 12);

    const newUser = new User({ 
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashed_password
     });

    const user = await newUser.save();

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      },
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
