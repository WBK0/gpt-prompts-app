export default interface Prompt {
  _id: string;
  creator: string;
  title: string;
  content: string;
  tags: string[];
  response?: string;
  createdAt: Date;
}