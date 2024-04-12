interface validatePromptProps {
  title: string,
  content: string,
  tags: string[]
}

export const validatePrompt = ({title, content, tags} : validatePromptProps) => {
  if(!title || !content || !tags){
    return JSON.stringify("Missing data");
  }
  if(tags.length < 1){
    return JSON.stringify("You need to provide at least one tag");
  }
  if(tags.length > 8){
    return JSON.stringify("You can provide max 8 tags");
  }
  if(content.length > 2048){
    return JSON.stringify("Prompt is too long");
  }
  if(title.length > 64){
    return JSON.stringify("Title is too long");
  }
  return false;
}