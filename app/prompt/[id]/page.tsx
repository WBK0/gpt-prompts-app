import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import PromptCard from '@components/PromptCard';
import gptLogo from '@assets/gpt-logo.png';

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

const sanitizedAnswer = DOMPurify.sanitize(prompt.gptAnswer);

const otherPrompts = [
  {
    id: 2,
    title: 'How to improve your website SEO',
    content: 'Learn how to optimize your website for search engines and improve your search engine rankings.',
    favourites: 123,
    tags: ['seo', 'marketing', 'business', 'sales', 'brand awareness', 'leads'],
  },
  {
    id: 3,
    title: 'How to create a successful email marketing campaign',
    content: 'Learn how to create an effective email marketing campaign that drives conversions and builds customer loyalty.',
    favourites: 456,
    tags: ['seo', 'marketing', 'business', 'sales', 'brand awareness', 'leads'],
  },
  {
    id: 4,
    title: 'How to use social media for customer service',
    content: 'Learn how to use social media to provide excellent customer service and build brand loyalty.',
    favourites: 789,
    tags: ['seo', 'marketing', 'business', 'sales', 'brand awareness', 'leads'],
  },
];

const PromptSite = () => {

  return (
    <div className="mt-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-4 lg:px-6 lg:py-6 py-4">
          <h1 className="text-3xl font-gilroyBold text-gray-900">{prompt.title}</h1>
          <div className="mt-4">
            <p className="text-gray-500 text-sm font-gilroyLight">{prompt.createdBy} | {prompt.createdAt}</p>
          </div>
          <div className="mt-6">
            <p className="text-lg text-gray-500 font-gilroyMedium">{prompt.content}</p>
          </div>
          <div className="mt-6 bg-black px-5 py-5 rounded-md">
            <h2 className="text-xl font-gilroyBold text-white flex items-center">
              <Image src={gptLogo} width={24} alt="gpt logo" className="mr-2" />
              Przykładowa odpowiedź GPT:
            </h2>
            <div className="mt-2 text-gray-200 font-gilroyLight " dangerouslySetInnerHTML={{ __html: sanitizedAnswer }}></div>
          </div>
          <div className='flex flex-wrap mt-4'>
            {prompt.tags && prompt.tags.map(tag => (
              <span key={tag} className='bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-gilroyMedium mr-2 mb-2 '>{tag}</span>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-100 flex items-center">
          <button className="bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1">
            <svg className="h-5 w-5 fill-current text-gray-500" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C4.54 14.35 2 11.08 2 7.5 2 4.42 4.42 2 7.5 2c2.34 0 4.47 1.19 5.74 3.16C14.03 3.19 16.16 2 18.5 2 21.58 2 24 4.42 24 7.5c0 3.58-2.54 6.85-8.55 12.53L12 21.35z"/>
            </svg>
          </button>
          <span className="text-gray-500 font-gilroyBold ml-2">{prompt.favourites}</span>
        </div>
      </div>
      <div className="mt-12 mb-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-gilroyBold text-gray-900 mb-4 px-4">Inne propozycje:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherPrompts.map(prompt => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PromptSite;