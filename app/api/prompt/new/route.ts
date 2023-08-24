import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { getServerSession } from "next-auth";
// import { authOptions } from "@app/api/auth/[...nextauth]/route"


export const POST = async (request : Request) => {
    const { userId, prompt, tag, test } = await request.json();
    try {
        // await connectToDB();
        // const newPrompt = new Prompt({ creator: userId, prompt, tag });

        // await newPrompt.save();
        const test1 = await getServerSession();
        console.log(test1)
        console.log(userId, prompt, tag)
        return new Response(JSON.stringify({userId}), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}