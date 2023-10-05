"use client";
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const AddToFavorite = ({favorites, id, isFavorite} : {favorites : number, isFavorite: boolean, id: string}) => {
  const [isLiked, setIsLiked] = useState(isFavorite);
  const [likes, setLikes] = useState(favorites);

  const session = useSession();

  const handleSubmit = async () => {
    try {
      if(session.status === 'unauthenticated') {
        throw new Error('You must be logged in to like a prompt');
      }
      setIsLiked(!isLiked);
      setLikes(isLiked ? likes - 1 : likes + 1);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/prompt/${id}/${isLiked ? 'dislike' : 'like'}`, {
        method: 'PATCH'
      })
      const data = await response.json();
      setLikes(data.favorites);
      setIsLiked(data.isLiked);
    } catch (error : unknown) {
      if(error instanceof Error){
        toast.error(error.message);
      }
    }
  }

  return (
    <div className="flex items-center">
      <button className="bg-gray-200 dark:bg-zinc-700 hover:dark:bg-zinc-800 hover:bg-gray-300 rounded-full px-3 py-1" onClick={handleSubmit}>
        <svg className={`h-5 w-6 fill-current ${isLiked ? 'text-red-500' : 'text-gray-500'}`} viewBox="0 0 25 24">
          <path d="M12 21.35l-1.45-1.32C4.54 14.35 2 11.08 2 7.5 2 4.42 4.42 2 7.5 2c2.34 0 4.47 1.19 5.74 3.16C14.03 3.19 16.16 2 18.5 2 21.58 2 24 4.42 24 7.5c0 3.58-2.54 6.85-8.55 12.53L12 21.35z"/>
        </svg>
      </button>
      <span className="text-gray-500 font-gilroyBold ml-2">{likes}</span>
    </div>
  )
}

export default AddToFavorite;