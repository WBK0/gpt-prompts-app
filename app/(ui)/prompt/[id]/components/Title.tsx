import React from 'react'

const Title = ({title} : {title : string}) => {
  return (
    <h1 className="text-3xl font-gilroyBold text-gray-900 dark:text-white">{title}</h1>
  )
}

export default Title;