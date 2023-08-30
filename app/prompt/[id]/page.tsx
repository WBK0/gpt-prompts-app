import GptAnswer from './components/GptAnswer';
import Content from './components/Content';
import Title from './components/Title';
import Creator from './components/Creator';
import Tags from '@components/Tags';
import AddToFavourite from './components/AddToFavourite';
import OtherPrompts from './components/OtherPrompts';

type PromptProps = {
  params: {
    id: string
  }
}

const PromptSite = async ({ params } : PromptProps) => {
  const response = await fetch(`http://localhost:3000/api/prompt/${params.id}`, {
    cache: "no-store"
  })
  const prompt = await response.json()

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
          <AddToFavourite favourites={prompt.favourites} />
        </div>
        <OtherPrompts />
      </>
      : null
    }
      
    </div>
  )
}

export default PromptSite;