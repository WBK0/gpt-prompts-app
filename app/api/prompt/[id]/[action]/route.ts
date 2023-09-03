import { Token } from "@interfaces/Token.interface";
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

// Get prompt by id from database
export const PATCH = async (request: NextRequest, { params: { id, action } }: { params: { id: string, action: string } }) => {
  try {
    await connectToDB(); // Connect to database
    const token = await getToken({ req: request }) as Token; // Get user jwt token

    if(!token){
      return new Response("Unauthorized", { status: 401 });
    }

    if(action === 'like'){
      const prompt = await Prompt.findById(id);
      if(prompt.favoritesUserIds.includes(token.id)){
        return new Response("You already liked this prompt", { status: 400 });
      }
      prompt.favoritesUserIds.push(token.id);
      prompt.favorites += 1;
      await prompt.save();
    }else if(action === 'dislike'){
      const prompt = await Prompt.findById(id);
      if(prompt.favoritesUserIds.includes(token.id)){
        prompt.favoritesUserIds = prompt.favoritesUserIds.filter(userId => userId.toString() !== token.id); // Remove user id from favoritesUserIds
        prompt.favorites -= 1;
        await prompt.save();
      }
    }

    // Return response
    return new Response(JSON.stringify({'prompt': 'PROMPT'}), { status: 201 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to get prompt", { status: 500 });
  }
}