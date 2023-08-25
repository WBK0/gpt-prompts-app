import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import axios from "axios";
import { JWT, getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

interface Token extends JWT{
    id: string;
}

const addAnswer = async (content : string, id: number) => {
  const res = await axios.post(`http://gpt.codebybartlomiej.pl/`, {
    prompt: `I will provide you prompt, you will answer for it using html tags if you found a any words in [] or <> provide there matching words. Use <h2>, <h3>, <h4>, <p>, <strong>, <i>, <ul>, <li> html tags. My prompt is: ${content}`
  },
  {
    headers: {
      'Content-Type': 'application/json'
    }
  });


  if(res.data.error == 'error') {
    console.log('error')
    setTimeout(() => {
      addAnswer(content, id)
    }, 10000)
  }else{
    const prompt = await Prompt.findById(id)
    prompt.response = res.data.response
    await prompt.save()
  }
}

export const POST = async (request : NextRequest) => {
    const { title, content, tags } = await request.json();
    try {
        await connectToDB();
        const token = await getToken({ req: request }) as Token;
        const newPrompt = new Prompt({ creator: token.id, title, content, tags });
        const test = await newPrompt.save();

        const newPromptId = test._id.toString()

        addAnswer(content, newPromptId)

        return new Response(JSON.stringify('test'), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to create a new prompt: ", { status: 500 });
    }
}