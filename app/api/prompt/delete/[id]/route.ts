import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

// Get prompt by id from database
export const DELETE = async (request: NextRequest, { params: { id } }: { params: { id: string } }) => {
  try {
    await connectToDB(); // Connect to database

    const session = await getServerSession(authOptions);

    if(!session){
      return new Response("Unauthorized", { status: 401 });
    }

    let prompt = await Prompt.findById(id);

    if(session?.user?.id && prompt.creatorId.toString() !== session.user.id){
      return new Response(JSON.stringify("You can't delete not yours prompt"), { status: 401 });
    }

    const deletedPrompt = await Prompt.findByIdAndDelete(id);

    console.log(deletedPrompt);

    // Return response
    return new Response(JSON.stringify(deletedPrompt), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to get prompt", { status: 500 });
  }
}