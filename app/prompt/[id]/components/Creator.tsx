import React from 'react'

const Creator = ({createdBy, createdAt} : {createdBy: string, createdAt: string}) => {
  return (
    <div className="mt-4">
      <p className="text-gray-500 text-sm font-gilroyLight">{createdBy} | {createdAt}</p>
    </div>
  )
}

export default Creator;