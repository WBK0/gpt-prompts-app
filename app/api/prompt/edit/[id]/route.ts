import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

// Get prompt by id from database
export const GET = async (request: NextRequest, { params: { id } }: { params: { id: string } }) => {
  try {
    await connectToDB(); // Connect to database

    const session = await getServerSession(authOptions);

    if(!session){
      return new Response("Unauthorized", { status: 401 });
    }

    let prompt = await Prompt.findById(id);

    if(session?.user?.id && prompt.creatorId.toString() !== session.user.id){
      return new Response(JSON.stringify("You can't edit not yours prompt"), { status: 401 });
    }

    // Return response
    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to get prompt", { status: 500 });
  }
}

// Get prompt by id from database
export const PATCH = async (request: NextRequest, { params: { id } }: { params: { id: string } }) => {
  try {
    await connectToDB(); // Connect to database

    const { title, content, tags } = await request.json();

    const session = await getServerSession(authOptions);

    if(!session){
      return new Response("Unauthorized", { status: 401 });
    }

    let prompt = await Prompt.findById(id);

    if(!prompt){
      return new Response("Prompt not found", { status: 404 });
    }

    if(session?.user?.id && prompt.creatorId.toString() !== session.user.id){
      return new Response(JSON.stringify("You can't edit not yours prompt"), { status: 401 });
    }

    const updatedPrompt = await Prompt.findByIdAndUpdate(id, {
      title: title,
      content: content,
      tags: tags
    }, {new: true})

    // Return response
    return new Response(JSON.stringify(updatedPrompt), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to get prompt", { status: 500 });
  }
}