import User from "@models/user";
import { connectToDB } from "@utils/database";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import sendActiveAccountMail from "@utils/sendActiveAccountMail";

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

    const isEmailTaken = await User.findOne({ email: email });

    if(isEmailTaken){
      return new NextResponse(JSON.stringify("Email is already taken"), { status: 400 });
    }

    const hashed_password = await hash(password, 12);

    const newUser = new User({ 
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashed_password
     });

    const isMailSended = await sendActiveAccountMail(email);
    
     if(!isMailSended){
      return new NextResponse(JSON.stringify("Something went wrong"), { status: 500 });
    }

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
