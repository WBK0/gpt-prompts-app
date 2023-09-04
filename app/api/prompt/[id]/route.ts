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

    let prompt = await Prompt.findById(id);
    let isLiked = false;

    if(session && prompt.favoritesUserIds.includes(session.user?.id)){
      isLiked = true;
    }

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