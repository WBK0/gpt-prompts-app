import Link from "next/link";
import { redirect } from 'next/navigation'
import Redirect from "./redirect";

interface ActivateParams {
  searchParams: {
    token: string
  }
}

const Activate = async (params: ActivateParams) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/activate`, {
    method: 'PATCH',
    body: JSON.stringify({
      token: params.searchParams.token
    }),
    cache: "no-store"
  })

  const data = await response.json();

  return (
    <div className="mx-auto flex justify-center h-screen items-center bg-snow">
      <div className="w-96 flex justify-center pt-12 flex-wrap flex-col py-6">
        <i className="bi bi-check font-96 text-9xl text-green-800 w-full text-center"></i>
        <h1 className="w-full text-center font-gilroyBold pb-9 text-lg">
          Your account has been successfully activated!
        </h1>
        <Link href="/auth/login" className="w-full rounded-xl text-center bg-blue-500 text-white py-2 font-gilroyBold hover:bg-blue-600 cursor-pointer">
          Log in now!
        </Link>
        <Redirect />
      </div>
    </div>
  )
}
export default Activate;