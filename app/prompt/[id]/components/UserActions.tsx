import Link from "next/link";

const UserActions = ({ params } : {params: {id: string}}) => {
  return (
    <div>
      <Link href={`/prompt/edit/${params.id}`} className='bg-blue-700 hover:bg-blue-900 text-white font-bold py-1 px-5 rounded-xl'>
        Edit
      </Link>
      <button className="bg-red-700 hover:bg-red-900 text-white font-bold py-1 px-5 rounded-xl ml-4">
        Delete
      </button>
    </div>
  )
}
export default UserActions;