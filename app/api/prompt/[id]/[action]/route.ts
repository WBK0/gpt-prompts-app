import { Token } from "@interfaces/Token.interface";
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

// Api route for liking and disliking prompt
export const PATCH = async (request: NextRequest, { params: { id, action } }: { params: { id: string, action: string } }) => {
  try {
    await connectToDB(); // Connect to database

    // Get token from request
    const token = await getToken({ req: request }) as Token;

    // Check if token exists 
    if(!token){
      return new Response("Unauthorized", { status: 401 });
    }

    // Get prompt by id
    let prompt = await Prompt.findById(id);

    // Update prompt favorites and favoritesUserIds based on action (like or dislike) 
    if(action === 'like'){
      if(prompt.favoritesUserIds.includes(token.id)){
        return new Response(JSON.stringify("You already liked this prompt"), { status: 400 });
      }
      prompt.favoritesUserIds.push(token.id);
      prompt.favorites += 1;
      await prompt.save();
      prompt = {
        ...prompt.toObject(),
        isLiked: true
      }
    }else if(action === 'dislike'){
      if(prompt.favoritesUserIds.includes(token.id)){
        prompt.favoritesUserIds = prompt.favoritesUserIds.filter((userId : string) => userId.toString() !== token.id); // Remove user id from favoritesUserIds
        prompt.favorites -= 1;
        await prompt.save();
        prompt = {
          ...prompt.toObject(),
          isLiked: false
        }
      }else{
        return new Response(JSON.stringify("You cant dislike unliked prompt"), { status: 400 })
      }
    }

    // Return response
    return new Response(JSON.stringify(prompt), { status: 201 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to get prompt", { status: 500 });
  }
}