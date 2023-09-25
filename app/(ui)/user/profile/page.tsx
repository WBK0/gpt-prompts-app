import { authOptions } from '@app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Image from 'next/image';

// User profile page
const Profile = async () => {

  const session = await getServerSession(authOptions);

  return (
    <div className="w-full flex justify-center flex-wrap">
      <h1 className='font-gilroyBold w-full text-center text-2xl mt-6 mb-6'>User profile</h1>
      <Image 
        src={session?.user?.image}
        alt="Profile image"
        width={200}
        height={200}
        className='rounded-full'
      />
      <h2 className='font-gilroyBold w-full text-center text-xl mt-6 mb-6'>{session?.user?.name}</h2>
      <h3 className='font-gilroyBold w-full text-center text-lg mt-6 mb-6'>{session?.user?.email}</h3>
      <button className='font-gilroyBold w-[300px] text-center text-lg mt-6 mb-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full'>
        Change password
      </button>
    </div>
  )
}
export default Profile;