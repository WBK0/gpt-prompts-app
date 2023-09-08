import Prompt from "@models/prompt";

export const generateResponse = async (content : string, id: string) => {
  try {
    const response = await fetch('http://gpt.codebybartlomiej.pl/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `I will provide you prompt, you will answer for it using html tags if you found any words in [] or <> provide their matching words. Use <h2>, <h3>, <h4>, <p>, <strong>, <i>, <ul>, <li> html tags. My prompt is: ${content}`
      }),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    const data = await response.json();

    const prompt = await Prompt.findById(id);
    if(!prompt) 
      return;
    prompt.response = data.response
    await prompt.save()
  } catch (error) {
    console.log(error)
    setTimeout(() => {
      generateResponse(content, id)
    }, 10000)
  }
}