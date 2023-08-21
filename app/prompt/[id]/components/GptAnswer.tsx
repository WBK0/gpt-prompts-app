import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import gptLogo from '@assets/gpt-logo.png';

const GptAnswer = ({ answer } : {answer: string}) => {
  const sanitizedAnswer = DOMPurify.sanitize(answer);
  
  return (
    <div className="mt-6 bg-black px-5 py-5 rounded-md">
      <h2 className="text-xl font-gilroyBold text-white flex items-center">
        <Image src={gptLogo} width={24} alt="gpt logo" className="mr-2" />
        Przykładowa odpowiedź GPT:
      </h2>
      <div className="mt-2 text-gray-200 font-gilroyLight " dangerouslySetInnerHTML={{ __html: sanitizedAnswer }}></div>
    </div>
  )
}

export default GptAnswer;