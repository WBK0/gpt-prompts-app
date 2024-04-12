import Link from "next/link";
import Image from "next/image";
import logo from '@assets/logo.png'
import { useSession } from "next-auth/react";
import {redirect, useRouter} from "next/navigation";
import AuthGoogle from "@components/Auth/AuthGoogle";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import Form from "./Form";

const Login = async () => {
  const session = await getServerSession(authOptions);

  if(session){
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center w-96 px-3">
        <Image src={logo} width={128} height={128} alt="logo" className="mb-6" />
        <h1 className="text-4xl font-gilroyHeavy mb-8 dark:text-white">Login</h1>
        <AuthGoogle />
        <div>
          <p className="font-gilroyHeavy mb-4 dark:text-white">OR</p>
        </div>
        <Form />
        <Link href="/auth/register" className="mt-4 font-gilroyBold text-gray-500 hover:text-black dark:text-zinc-400 hover:dark:text-zinc-100">
          Don't have account? Register now!
        </Link>
        <Link href="/auth/reset-password" className="mt-2 font-gilroyBold text-gray-500 hover:text-black dark:text-zinc-400 hover:dark:text-zinc-100">
          Forgot password?
        </Link>
      </div>
    </div>
  )
}
export default Login;