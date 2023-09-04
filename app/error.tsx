'use client'
import Link from "next/link";

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void}) => {
  return (
    <div className="flex w-full justify-center items-center h-screen flex-wrap flex-col">
      <h1 className="text-4xl font-bold text-red-500">Something went wrong!</h1>
      <Link
        href="/"
        className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl mt-8"
      >
        Back to home page
      </Link>
    </div>
  )
}

export default Error;