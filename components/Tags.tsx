const Tags = ({tags}: {tags: string[]}) => {
  return (
    <div className='flex flex-wrap mt-4'>
      {tags && tags.map(tag => (
        <span key={tag} className='bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-gilroyMedium mr-2 mb-2 '>{tag}</span>
      ))}
    </div>
  )
}

export default Tags;