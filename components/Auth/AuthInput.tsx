interface AuthInputProps {
  name: string;
  placeholder: string;
  type: string;
  handleWrite: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleBlur?: () => void;
  value?: string;
  error?: string | null;
  isFocus?: boolean;
}

const AuthInput = ({name, placeholder, type, handleWrite, handleFocus, handleBlur, value, error, isFocus} : AuthInputProps) => {
  return (
    <>
      <input 
        type={type} 
        placeholder={placeholder}
        className={`rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 font-gilroyBold ${error ? 'ring-2 ring-red-600' : null}`} 
        name={name} 
        onChange={handleWrite} 
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
      />
      {
        error && isFocus ? <p className="text-red-600 font-gilroyBold text-sm">{error}</p> : null
      }
    </>
  )
}

export default AuthInput;