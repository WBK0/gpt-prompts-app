import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";

// Post new prompt to database
export const GET = async (request : NextRequest) => {
  try {
    await connectToDB(); // Connect to database
    const max = Number(request.nextUrl.searchParams.get("max")); // Get max number of prompts to return
    const prompts = await Prompt.find({}).sort({ createdAt: -1 }).limit(max || 12); // Get requested number of prompts or 12 by default
    // Return response
    return new Response(JSON.stringify(prompts), { status: 201 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to get prompts", { status: 500 });
  }
}