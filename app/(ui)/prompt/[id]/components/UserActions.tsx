"use client"
import Modal from "@components/Modal/Modal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const UserActions = ({ params } : {params: {id: string}}) => {
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/prompt/${params.id}`, {
        method: 'DELETE'
      })
      if(!response.ok) {
        throw new Error('Something went wrong!');
      }
      toast.success('Prompt deleted successfully!');
      router.push('/user/prompts');
    } catch (error) {
      console.log(error)
      toast.error(`${error}`);
    }   
  }

  const handleClose = () => {
    setShowModal(false);
  }

  const handleOpen = () => {
    setShowModal(true);
  }

  return (
    <div>
      <Link href={`/prompt/edit/${params.id}`} className='bg-blue-700 hover:bg-blue-900 text-white font-bold py-1 px-5 rounded-xl'>
        Edit
      </Link>
      <button 
        className="bg-red-700 hover:bg-red-900 text-white font-bold py-1 px-5 rounded-xl ml-4"
        onClick={handleOpen}
      >
        Delete
      </button>
      {
        showModal
        ?
          <Modal 
            handleClose={handleClose}
            handleSubmit={handleSubmit}
          />
        : 
          null
      }
    </div>
  )
}
export default UserActions;