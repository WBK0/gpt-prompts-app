import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";

// Post new prompt to database
export const GET = async (request : NextRequest) => {
  try {
    await connectToDB(); // Connect to database

    const prompts = await Prompt.find({}).sort({ createdAt: -1 }).limit(10); // Get 10 latest prompts

    // Return response
    return new Response(JSON.stringify(prompts), { status: 201 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to get prompts", { status: 500 });
  }
}