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
  disabled?: boolean;
}

const AuthInput = ({name, placeholder, type, handleWrite, handleFocus, handleBlur, value, error, isFocus, disabled} : AuthInputProps) => {
  return (
    <>
      <input 
        type={type} 
        placeholder={placeholder}
        className={`rounded-lg w-full px-4 py-2 dark:bg-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-400 font-gilroyBold ${error ? 'ring-2 ring-red-600' : null} disabled:bg-gray-200 disabled:dark:bg-zinc-800 disabled:cursor-not-allowed disabled:text-gray-800 disabled:dark:text-zinc-300`} 
        name={name} 
        onChange={handleWrite} 
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        disabled={disabled}
      />
      {
        error && isFocus ? <p className="text-red-600 font-gilroyBold text-sm">{error}</p> : null
      }
    </>
  )
}

export default AuthInput;