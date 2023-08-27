"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation'
import GptAnswer from './components/GptAnswer';
import Content from './components/Content';
import Title from './components/Title';
import Creator from './components/Creator';
import Tags from '@components/Tags';
import AddToFavourite from './components/AddToFavourite';
import OtherPrompts from './components/OtherPrompts';
import Prompt from '@interfaces/prompt.interface';

const PromptSite = () => {
  const params = useParams()

  const [prompt, setPrompt] = useState<Prompt | null>(null);

  const getPrompt = async () => {
    try {
      const response = await axios.get(`/api/prompt/${params.id}`);
      setPrompt(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  console.log(prompt)

  useEffect(() => {
    getPrompt();
  }, [])

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