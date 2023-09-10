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
    const sort = request.nextUrl.searchParams.get("sort"); // Get sort type

    let prompts; // Declare prompts variable

    // Get prompts from database based on sort type
    if(sort === 'favorites') {
      prompts = await Prompt.aggregate([
        { $sort: { favorites: -1 } },
        { $limit: max || 12 },
      ]);
    }else{
      prompts = await Prompt.aggregate([
        { $sample: { size: max || 12 } },
        { $sort: { createdAt: -1 } },
      ]);
    }

    // Add isLiked to prompt object
    prompts = prompts.map(prompt => {
      let isLiked = false;
      
      if (session) {
        isLiked = prompt.favoritesUserIds.toString().includes(session.user?.id);
      }
      return { ...prompt, isLiked };
    });

    // Return response
    return new Response(JSON.stringify(prompts), { status: 201 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to get prompts", { status: 500 });
  }
}