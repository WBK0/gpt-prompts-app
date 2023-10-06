import Link from "next/link";
import Redirect from "@components/redirect";

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

  return (
    <div className="mx-auto flex justify-center h-screen items-center bg-snow">
      <div className="w-96 flex justify-center pt-12 flex-wrap flex-col py-6">
        {
          response.ok
          ? <i className="bi bi-check font-96 text-9xl text-green-800 w-full text-center"></i>
          : <i className="bi bi-x font-96 text-9xl text-red-600 w-full text-center"></i>
        }
        <h1 className="w-full text-center font-gilroyBold pb-9 text-lg dark:text-white">
          {
            response.ok
            ? 'Your account has been successfully activated!'
            : 'Something went wrong. Please try again later.'
          }
        </h1>
        {
          response.ok
          ? <Link href="/auth/login" className="w-full rounded-xl text-center bg-blue-500 text-white py-2 font-gilroyBold hover:bg-blue-600 cursor-pointer">
              Log in now!
            </Link>
          : <Link href="/auth/login" className="w-full rounded-xl text-center bg-red-500 text-white py-2 font-gilroyBold hover:bg-red-600 cursor-pointer">
              Try again
            </Link>
        }

        {
          response.ok
          ? <Redirect />
          : <></>
        }
      </div>
    </div>
  )
}
export default Activate;