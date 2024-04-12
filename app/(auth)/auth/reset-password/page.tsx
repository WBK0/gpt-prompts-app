import Image from "next/image";
import logo from '@assets/logo.png'
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import SendMailForm from "./SendMailForm";
import ResetPasswordForm from "./ResetPasswordForm";

interface ResetPasswordParams {
  searchParams: {
    token: string
  }
}

const ResetPassword = async ( params : ResetPasswordParams) => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center w-96 px-3">
        <Image src={logo} width={128} height={128} alt="logo" className="mb-6" />
        {
          params.searchParams.token
          ? <ResetPasswordForm token={params.searchParams.token} />
          : <SendMailForm sessionEmail={session?.user?.email} sessionProvider={session?.user?.provider}/>
        }
        
      </div> 
    </div>
  )
}
export default ResetPassword;