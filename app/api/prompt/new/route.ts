import { Token } from "@interfaces/Token.interface";
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { generateResponse } from "@utils/generateResponse";
import { validatePrompt } from "@utils/validatePromptData";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

// Post new prompt to database
export const POST = async (request : NextRequest) => {
  // Get data from request
  const { title, content, tags } = await request.json();
  try {
    await connectToDB(); // Connect to database
    const token = await getToken({ req: request }) as Token; // Get user jwt token

    // Validate data from request and token
    if(!token){
      return new Response(JSON.stringify("Unauthorized"), { status: 401 });
    }
  
    // Validate prompt data
    const validationError = validatePrompt({title, content, tags});

    // Return error if validation failed
    if(validationError){
      return new Response(validationError, { status: 400 });
    }

    // Create new prompt and save it to database
    const newPrompt = new Prompt({ creatorId: token.id, creatorName: token.name, title, content, tags });
    const savedPrompt = await newPrompt.save();

    // Get id of new prompt
    const newPromptId = savedPrompt._id.toString()

    // Add answer to prompt using gpt-3 api
    generateResponse(content, newPromptId)

    // Return response
    return new Response(JSON.stringify(savedPrompt), { status: 201 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to create a new prompt", { status: 500 });
  }
}