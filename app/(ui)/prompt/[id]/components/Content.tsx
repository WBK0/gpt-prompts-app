import React from 'react'

const Content = ({content} : {content : string}) => {
  return (
    <div className="mt-6">
      <p className="text-lg text-gray-500 dark:text-zinc-200 font-gilroyMedium">{content}</p>
    </div>
  )
}

export default Content;