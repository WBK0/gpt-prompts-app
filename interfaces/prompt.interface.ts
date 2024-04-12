export default interface Prompt {
  _id: string;
  creatorId: string;
  creatorName: string;
  title: string;
  content: string;
  tags: string[];
  response?: string;
  createdAt: Date;
  favorites: number;
  isLiked?: boolean;
}