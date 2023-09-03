import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required!'],
    maxLength: [64, 'Title cannot be more than 64 characters!'],
  },
  content: {
    type: String,
    required: [true, 'Prompt content is required!'],
    maxLength: [2048, 'Prompt cannot be more than 2048 characters!'],
  },
  tags: {
    type: [String],
    required: [true, 'Prompt must have at least one tag!'],
    maxLength: [8, 'Prompt cannot have more than 8 tags!'],
  },
  response: {
    type: String,
    maxLength: [4096, 'Response cannot be more than 4096 characters!'],
  },
  favorites: {
    type: Number,
    default: 0,
  },
  favoritesUserIds: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  creatorName: {
    type: String,
    ref: 'User',
  }
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;