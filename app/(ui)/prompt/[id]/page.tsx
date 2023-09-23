import GptAnswer from './components/GptAnswer';
import Content from './components/Content';
import Title from './components/Title';
import Creator from './components/Creator';
import Tags from '@components/Tags';
import AddToFavorite from './components/AddToFavorite';
import OtherPrompts from './components/OtherPrompts';
import { headers } from 'next/headers';
import UserActions from './components/UserActions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@app/api/auth/[...nextauth]/route';

type PromptProps = {
  params: {
    id: string
  }
}

const PromptSite = async ({ params } : PromptProps) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/prompt/${params.id}`, {
    cache: "no-store",
    headers: headers(),
  })
  const prompt = await response.json()

  const session = await getServerSession(authOptions);

  return (
    <div className="mt-6">{
      prompt ?
      <>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 lg:px-6 lg:py-6 py-4">
            <Title title={prompt.title} />
            <Creator createdAt={prompt.createdAt} creatorName={prompt.creatorName} />
            <Content content={prompt.content} />
            <GptAnswer answer={prompt.response} />
            <Tags tags={prompt.tags} />
          </div>
          <div className="px-6 py-4 bg-gray-100 flex items-center justify-between">
            <AddToFavorite favorites={prompt.favorites} id={prompt._id} isFavorite={prompt.isLiked}/>
            {
              session?.user?.id === prompt?.creatorId
              ?
                <UserActions params={params} />
              : 
                null
            }
          </div>
        </div>
        <OtherPrompts />
      </>
      : null
    }
      
    </div>
  )
}

export default PromptSite;