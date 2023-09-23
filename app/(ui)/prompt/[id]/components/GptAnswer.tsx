import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import gptLogo from '@assets/gpt-logo.png';

const config = {
  FORBID_TAGS: ['pre'],
};

const GptAnswer = ({ answer } : {answer?: string}) => {
  const sanitizedAnswer = answer ? DOMPurify.sanitize(answer, config) : '';
  
  return (
    <div className="mt-6 bg-black px-5 py-5 rounded-md ">
      <h2 className="text-xl font-gilroyBold text-white flex items-center">
        <Image src={gptLogo} width={24} alt="gpt logo" className="mr-2" />
        Example GPT Answer:
      </h2>
      <div className="break-words w-100">
        {
          answer ?
            <div className="mt-2 text-gray-200 font-gilroyLight w-100" dangerouslySetInnerHTML={{ __html: sanitizedAnswer }}></div>
          : <div className="mt-2 text-gray-200 font-gilroyLight w-100">
              The sample answer for this prompt is being generated. Due to the heavy load on the servers, <b>this may take up to 15 minutes.</b> Thank you for your patience!
            </div>
        }
      </div>
    </div>
  )
}

export default GptAnswer;