import PromptCard from '@components/PromptCard';
import React from 'react'

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

const OtherPrompts = () => {
  return (
    <div className="mt-12 mb-12 max-w-6xl mx-auto">
      <h2 className="text-2xl font-gilroyBold text-gray-900 mb-4 px-4">Another prompts:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {otherPrompts.map(prompt => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </div>
  )
}

export default OtherPrompts;