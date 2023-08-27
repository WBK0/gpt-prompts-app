import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import axios from "axios";
import { JWT, getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

interface Token extends JWT{
    id: string;
}

const addAnswer = async (content : string, id: number) => {
  try {
    const res = await axios.post(`http://gpt.codebybartlomiej.pl/`, {
      prompt: `I will provide you prompt, you will answer for it using html tags if you found a any words in [] or <> provide there matching words. Use <h2>, <h3>, <h4>, <p>, <strong>, <i>, <ul>, <li> html tags. My prompt is: ${content}`
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(res)
    const prompt = await Prompt.findById(id);
    if(!prompt) 
      return;
    prompt.response = res.data.response
    await prompt.save()
  } catch (error) {
    console.log(error)
    setTimeout(() => {
      console.log('lecymy dur')
      addAnswer(content, id)
    }, 10000)
  }
}

// Post new prompt to database
export const POST = async (request : NextRequest) => {
  // Get data from request
  const { title, content, tags } = await request.json();
  try {
    await connectToDB(); // Connect to database
    const token = await getToken({ req: request }) as Token; // Get user jwt token

    // Validate data from request and token
    if(!token){
      return new Response("Unauthorized", { status: 401 });
    }
    if(!title || !content || !tags){
      return new Response("Missing data", { status: 400 });
    }
    if(tags.length < 1){
      return new Response("You need to provide at least one tag", { status: 400 });
    }
    if(tags.length > 8){
      return new Response("You can provide max 8 tags", { status: 400 });
    }
    if(content.length > 2048){
      return new Response("Content is too long", { status: 400 });
    }
    if(title.length > 64){
      return new Response("Title is too long", { status: 400 });
    }

    // Create new prompt and save it to database
    const newPrompt = new Prompt({ creatorId: token.id, creatorName: token.name, title, content, tags });
    const savedPrompt = await newPrompt.save();

    // Get id of new prompt
    const newPromptId = savedPrompt._id.toString()

    // Add answer to prompt using gpt-3 api
    addAnswer(content, newPromptId)

    // Return response
    return new Response(JSON.stringify(savedPrompt), { status: 201 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to create a new prompt", { status: 500 });
  }
}