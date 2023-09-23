import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// Get prompt by search query
export const GET = async (request : NextRequest) => {
  try {
    await connectToDB(); // Connect to database
    let session = await getServerSession(authOptions);

    const query = request.nextUrl.searchParams.get("search"); // Get search query from url
    const skip = request.nextUrl.searchParams.get("skip"); // Get skip number from url
    const max = request.nextUrl.searchParams.get("max"); // Get skip number from url

    let prompts = await Prompt.find({
      $and: [
        { $or: [
          { title: { $regex: query, $options: 'i' } }, // Search title
          { tags: { $in: query } } // Search tags
        ] },
        { favoritesUserIds: { $elemMatch: { $eq: session?.user?.id } } } // Search favoritesUserIds
      ]
    })
    .sort({ createdAt: -1 })
    .skip(Number(skip))
    .limit(Number(max) || 12);

    prompts = prompts.map(prompt => {
      let isLiked = false;
      if(session){
        isLiked = prompt.favoritesUserIds.includes(session.user?.id);
      }
      return { ...prompt.toObject(), isLiked };
    }); 
    
    // Return response
    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to get prompts", { status: 500 });
  }
}