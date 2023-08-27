import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";

// Get prompt by id from database
export const GET = async (request: NextRequest, { params: { id } }: { params: { id: string } }) => {
  try {
    await connectToDB(); // Connect to database

    const prompt = await Prompt.findById(id);

    // Return response
    return new Response(JSON.stringify(prompt), { status: 201 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to get prompt", { status: 500 });
  }
}