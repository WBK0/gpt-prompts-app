interface AuthButtonProps {
  isSubmitting: boolean;
  children: React.ReactNode;
}

const AuthButton = ({isSubmitting, children} : AuthButtonProps) => {
  return (
    <button 
      type="submit" 
      className="bg-blue-500 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 font-gilroyBold w-full hover:bg-blue-600"
      disabled={isSubmitting}
      >
      {
        isSubmitting 
        ? 
          <div className="border-4 border-r-transparent border-b-transparent rounded-full border-white animate-spin w-6 h-6 mx-auto" />
        : 
          <span>
            {children}
          </span>
      }
    </button>
  )
}

export default AuthButton