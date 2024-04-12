import OpenAI from "openai";
import Prompt from "@models/prompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateResponse = async (content : string, id: string) => {
  try {
    const prompt = await Prompt.findById(id);
    if(!prompt) 
      return;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: `I will provide you prompt, you will answer for it using html tags if you found any words in [] or <> provide their matching words. Use <h2>, <h3>, <h4>, <p>, <strong>, <i>, <ul>, <li> html tags. In your reply, ignore the fact that you are replying with html tags, but don't talk about it. My prompt is: ${content}` }],
      model: "gpt-3.5-turbo",
    });

    prompt.response = completion.choices[0].message.content
    await prompt.save()
  } catch (error) {
    setTimeout(() => {
      generateResponse(content, id)
    }, 10000)
  }
}