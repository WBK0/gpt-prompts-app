interface FormErrors{
  title: string | null,
  prompt: string | null,
  tags: string | null
}

interface TagErrors{
  tags: string | null,
  tagInput: string | null
}

export const useFormValidate = () => {
  const validateForm = ({ title, prompt, tags }: { title: string, prompt: string, tags: string[] }) => {
    let errors : FormErrors = {
      title: null,
      prompt: null,
      tags: null
    }
    if(title.length < 1){
      errors.title = "Title is required";
    }
    if(prompt.length < 1){
      errors.prompt = "Prompt is required";
    }
    if(tags.length < 1){
      errors.tags = "Prompt must have at least one tag";
    }
    if(title.length >= 64){
      errors.title = "Title cannot be more than 64 characters";
    }
    if(prompt.length >= 2048){
      errors.prompt = "Prompt cannot be more than 2048 characters";
    }
    if(tags.length >= 8){
      errors.tags = "Prompt cannot have more than 8 tags";
    }
    return errors;
  }

  const validateTags = ({ tags, tagInput } : {tags: string[], tagInput: string}) => {
    let errors : TagErrors= {
      tags: null,
      tagInput: null
    }
    if(tags.length >= 8){
      errors.tags = "Prompt cannot have more than 8 tags";
    }
    if(tagInput.length >= 32){
      errors.tagInput = "Tag cannot be more than 32 characters";
    }
    if(tagInput.length < 1){
      errors.tagInput = "Tag must have at least one character";
    }
    if(tags.includes(tagInput)){
      errors.tagInput = "Tag can't be one of the existing tags";
    }
    return errors;
  }

  return { validateForm, validateTags };
}