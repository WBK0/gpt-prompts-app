import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

// Post new prompt to database
export const GET = async (request : NextRequest) => {
  try {
    let session = await getServerSession(authOptions);
    await connectToDB(); // Connect to database
    const max = Number(request.nextUrl.searchParams.get("max")); // Get max number of prompts to return
    let prompts = await Prompt.find({}).sort({ createdAt: -1 }).limit(max || 12); // Get requested number of prompts or 12 by default

    prompts = prompts.map(prompt => {
      let isLiked = false;
      if(session){
        isLiked = prompt.favoritesUserIds.includes(session.user?.id);
      }
      return { ...prompt.toObject(), isLiked };
    }); 

    // Return response
    return new Response(JSON.stringify(prompts), { status: 201 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to get prompts", { status: 500 });
  }
}