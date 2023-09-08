"use client"
import Modal from "@components/Modal/Modal";
import Link from "next/link";
import { useState } from "react";

const UserActions = ({ params } : {params: {id: string}}) => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async () => {
    const response = await fetch(`http://localhost:3000/api/prompt/delete/${params.id}`, {
      method: 'DELETE'
    })
    console.log(response)
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