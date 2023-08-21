import PromptCard from '@components/PromptCard';
import GptAnswer from './components/GptAnswer';
import Content from './components/Content';
import Title from './components/Title';
import Creator from './components/Creator';
import Tags from '@components/Tags';
import AddToFavourite from './components/AddToFavourite';
import OtherPrompts from './components/OtherPrompts';

const prompt = {
  id: 1,
  title: 'How to create a successful social media marketing campaign',
  content: 'Learn how to create a social media marketing campaign that will help you reach your target audience and achieve your business goals.',
  gptAnswer: `<h1>Create a Successful Social Media Marketing Campaign</h1>

  <p>Welcome to our guide on crafting a social media marketing campaign that effectively reaches your target audience and drives your business goals.</p>
  
  <h2>1. Set Clear Goals</h2>
  <p>Define your campaign objectives, whether it's boosting sales, increasing brand awareness, or generating leads.</p>
  
  <h2>2. Identify Your Target Audience</h2>
  <p>Understand your ideal customers' demographics, interests, and behaviors to tailor your content.</p>
  
  <h2>3. Choose the Right Platforms</h2>
  <p>Select social media platforms based on your audience's preferences. Consider Facebook, Instagram, Twitter, LinkedIn, TikTok, and Pinterest.</p>
  
  <h2>4. Craft Compelling Content</h2>
  <p>Create valuable and engaging content, such as videos, images, and blog posts, that resonates with your audience.</p>
  
  <h2>5. Create a Content Calendar</h2>
  <p>Plan your content in advance using a content calendar to maintain a consistent posting schedule.</p>
  
  <h2>6. Utilize Visuals</h2>
  <p>Incorporate high-quality images and videos that align with your brand's aesthetic and message.</p>
  
  <h2>7. Incorporate Storytelling</h2>
  <p>Share stories that emotionally connect with your audience and humanize your brand.</p>
  
  <h2>8. Utilize Hashtags</h2>
  <p>Research and use relevant hashtags to increase the discoverability of your content.</p>
  
  <h2>9. Engage and Interact</h2>
  <p>Respond promptly to comments, messages, and mentions to build relationships and community.</p>
  
  <h2>10. Run Targeted Ads</h2>
  <p>Use social media advertising to reach specific audience segments aligned with your campaign goals.</p>
  
  <h2>11. Collaborate with Influencers</h2>
  <p>Partner with influencers to tap into their engaged follower base and enhance credibility.</p>
  
  <h2>12. Measure and Analyze</h2>
  <p>Monitor campaign performance using analytics, track metrics, and adjust your strategy based on insights.</p>
  
  <h2>13. Optimize and Iterate</h2>
  <p>Refine your campaign based on data, identifying strengths and weaknesses to improve results.</p>
  
  <h2>14. Monitor Trends</h2>
  <p>Stay updated with social media marketing trends to adapt and remain relevant.</p>
  
  <h2>15. Stay Consistent</h2>
  <p>Maintain a steady posting schedule and consistent engagement with your audience over time.</p>
  
  <p>Remember, each campaign should be customized to your business, audience, and goals. Adaptability is key as you learn and evolve from each campaign's performance.</p>
  <script>alert('xd')</script>
  `,
  tags: ['marketing', 'social media', 'business', 'sales', 'brand awareness', 'leads'],
  createdAt: '24.08.2023',
  createdBy: 'Bartłomiej Ostojski',
  favourites: 321,
}

const PromptSite = () => {

  return (
    <div className="mt-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-4 lg:px-6 lg:py-6 py-4">
          <Title title={prompt.title} />
          <Creator createdAt={prompt.createdAt} createdBy={prompt.createdBy} />
          <Content content={prompt.content} />
          <GptAnswer answer={prompt.gptAnswer} />
          <Tags tags={prompt.tags} />
        </div>
        <AddToFavourite favourites={prompt.favourites} />
      </div>
      <OtherPrompts />
    </div>
  )
}

export default PromptSite;