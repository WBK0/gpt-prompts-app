import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// Get prompt by search query
export const GET = async (request : NextRequest) => {
  try {
    await connectToDB(); // Connect to database

    // Get session from request
    let session = await getServerSession(authOptions);

    const query = request.nextUrl.searchParams.get("search"); // Get search query from url
    const skip = request.nextUrl.searchParams.get("skip"); // Get skip number from url
    const max = request.nextUrl.searchParams.get("max"); // Get skip number from url

    // Get prompts from database based on search query and sort them by createdAt
    let prompts = await Prompt.find({})
    .find(
      {
        $or: [
          { title: { $regex: query, $options: 'i' } }, 
          { tags: { $in: query } }
        ],})
    .sort({ createdAt: -1 })
    .skip(Number(skip))
    .limit(Number(max) || 12);

    // Set isLiked to false by default
    prompts = prompts.map(prompt => {
      let isLiked = false;
      // Check if session exists and if user id is in favoritesUserIds
      if(session){
        // Set isLiked to true
        isLiked = prompt.favoritesUserIds.includes(session.user?.id);
      }
      // Add isLiked to prompt object
      return { ...prompt.toObject(), isLiked };
    }); 
    
    // Return response
    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to get prompts", { status: 500 });
  }
}