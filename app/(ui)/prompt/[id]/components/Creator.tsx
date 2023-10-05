import React from 'react'

const Creator = ({creatorName, createdAt} : {creatorName: string, createdAt: Date}) => {

  const date = new Date(createdAt);
  // Convert date from mongoDb to readable format
  const formattedDate = date.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});

  return (
    <div className="mt-4">
      <p className="text-gray-500 dark:text-zinc-300 text-sm font-gilroyLight">{creatorName} | {formattedDate}</p>
    </div>
  )
}

export default Creator;