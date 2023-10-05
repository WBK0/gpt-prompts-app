import Image from "next/image";
import Link from "next/link";
import logo from '@assets/logo.png'
import Form from "./Form";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Register = async () => {
  const session = await getServerSession(authOptions);

  if(session){
    redirect("/");
  }
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center w-96 px-3 sm:px-0">
        <Image src={logo} width={128} height={128} alt="logo" className="mb-6" />
        <h1 className="text-4xl font-gilroyHeavy mb-8 dark:text-white">Register</h1>
        <Form />
        <Link href="/auth/login" className="mt-4 font-gilroyBold text-gray-500 hover:text-black dark:text-zinc-400 hover:dark:text-zinc-100">
          Have an account? Login now!
        </Link>
      </div>
    </div>
  )
}
export default Register;