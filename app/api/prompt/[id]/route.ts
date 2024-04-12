import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { generateResponse } from "@utils/generateResponse";
import { validatePrompt } from "@utils/validatePromptData";

// Get prompt by id from database
export const GET = async (request: NextRequest, { params: { id } }: { params: { id: string } }) => {
  try {
    await connectToDB(); // Connect to database

    // Get session from request 
    const session = await getServerSession(authOptions);

    // Get prompt by id
    let prompt = await Prompt.findById(id);
    
    // Set isLiked to false by default 
    let isLiked = false;

    // Check if session exists and if user id is in favoritesUserIds
    if(session && prompt.favoritesUserIds.includes(session.user?.id)){
      isLiked = true;
    }

    // Add isLiked to prompt object
    prompt = {
      ...prompt.toObject(),
      isLiked: isLiked
    }

    // Return response
    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to get prompt", { status: 500 });
  }
}

// Update prompt by id
export const PATCH = async (request: NextRequest, { params: { id } }: { params: { id: string } }) => {
  try {
    await connectToDB(); // Connect to database

    // Get json data from request
    const { title, content, tags } = await request.json();

    // Get session from request
    const session = await getServerSession(authOptions);

    // Check if session exists
    if(!session){
      return new Response("Unauthorized", { status: 401 });
    }

    // Get prompt by id
    let prompt = await Prompt.findById(id);

    // Check if prompt exists
    if(!prompt){
      return new Response("Prompt not found", { status: 404 });
    }

    // Check if user id is equal to prompt creator id 
    if(session?.user?.id && prompt.creatorId.toString() !== session.user.id){
      return new Response(JSON.stringify("You can't edit not yours prompt"), { status: 401 });
    }

    // Validate data from request
    const validateError = validatePrompt({title, content, tags});

    // Check if validation failed
    if(validateError){
      return new Response(JSON.stringify(validateError), { status: 400 });
    }

    // Update prompt
    const updatedPrompt = await Prompt.findByIdAndUpdate(id, {
      title: title,
      content: content,
      tags: tags,
      response: content !== prompt.content ? '' : prompt.response
    }, {new: true})

    // Regenerate response if content changed
    if(content !== prompt.content){
      generateResponse(content, id);
    }

    // Return response
    return new Response(JSON.stringify(updatedPrompt), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to get prompt", { status: 500 });
  }
}

// Delete prompt by id 
export const DELETE = async (request: NextRequest, { params: { id } }: { params: { id: string } }) => {
  try {
    await connectToDB(); // Connect to database

    // Get session from request
    const session = await getServerSession(authOptions);

    // Check if session exists
    if(!session){
      return new Response("Unauthorized", { status: 401 });
    }

    // Get prompt by id
    let prompt = await Prompt.findById(id);

    // Check is user id is equal to prompt creator id
    if(session?.user?.id && prompt.creatorId.toString() !== session.user.id){
      return new Response(JSON.stringify("You can't delete not yours prompt"), { status: 401 });
    }

    // Delete prompt
    const deletedPrompt = await Prompt.findByIdAndDelete(id);

    // Return response
    return new Response(JSON.stringify(deletedPrompt), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to get prompt", { status: 500 });
  }
}