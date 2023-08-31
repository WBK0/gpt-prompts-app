import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";

// Get prompt by search query
export const GET = async (request : NextRequest) => {
  try {
    await connectToDB(); // Connect to database

    const query = request.nextUrl.searchParams.get("search"); // Get search query from url

    const prompts = await Prompt.find({})
    .find(
      {
        $or: [
          { title: { $regex: query, $options: 'i' } }, // Search title 
          { tags: { $in: query } } // Search tags
        ],})
    .sort({ createdAt: -1 }).limit(12);

    // Return response
    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to get prompts", { status: 500 });
  }
}