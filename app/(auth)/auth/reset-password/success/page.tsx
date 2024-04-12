import Redirect from "@components/redirect";
import Link from "next/link";

const PasswordResetConfirmation = () => {
    return (
      <div className="mx-auto flex justify-center h-screen items-center bg-snow">
        <div className="w-96 flex justify-center pt-12 flex-wrap flex-col py-6">
          <i className="bi bi-check font-96 text-9xl text-green-800 w-full text-center"></i>
          <h1 className="w-full text-center font-gilroyBold pb-9 text-lg dark:text-white">
            Your password has been successfully changed!
          </h1>
          <Link href="/auth/login" className="w-full rounded-xl text-center bg-blue-500 text-white py-2 font-gilroyBold hover:bg-blue-600 cursor-pointer">
            Log in now!
          </Link>
          <Redirect />
        </div>
      </div>
  )
}
export default PasswordResetConfirmation;