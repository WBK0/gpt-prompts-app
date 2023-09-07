interface SubmitButtonProps {
  handleSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

const SubmitButton = ({ handleSubmit, children } : SubmitButtonProps) => {
  return (
    <button 
      type="submit" 
      className="block px-3 py-2 mx-auto mt-6 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      onClick={handleSubmit}
    >
      {children}
    </button>
  )
}

export default SubmitButton;