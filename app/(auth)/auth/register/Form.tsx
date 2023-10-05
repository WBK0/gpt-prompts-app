"use client";
import AuthButton from "@components/Auth/AuthButton"
import AuthInput from "@components/Auth/AuthInput"
import { useLoginValidate } from "@hooks/useLoginValidate"
import { useState } from "react"
import { userData } from "@interfaces/UserData.interface"
import { RegisterErrors } from "@hooks/useLoginValidate"
import { toast } from "react-toastify";
import EmailSendModal from "@components/Modal/EmailSendModal";

const Form = () => {
  const [userData ,setUserData] = useState<userData>({
    email: "",
    password: "",
    firstname: "",
    lastname: ""
  })
  const [errors, setErrors] = useState<RegisterErrors>({
    email: null,
    password: null,
    firstname: null,
    lastname: null
  })
  const [focusElement, setFocusElement] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { validateRegister } = useLoginValidate();

  const handleWrite = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => {
      return {...prev , [e.target.name]: e.target.value}
    })
  } 

  const handleSubmit = async (e : React.FormEvent) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const validateErrors = validateRegister(userData);
      setErrors({...validateErrors});
      if(validateErrors.email || validateErrors.password || validateErrors.firstname || validateErrors.lastname){
        throw new Error("Validation error");
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          firstname: userData.firstname,
          lastname: userData.lastname
        }),
      })

      if(res.ok){
        toast.success("Account created successfully, please confirm email now");
        setIsModalOpen(true);
      }else{
        const data = await res.json();
        throw new Error(data);
      }

    } catch (error : unknown) {
      if(error instanceof Error)
        toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleFocus = async (e: React.FocusEvent<HTMLInputElement>) => {
    setFocusElement(e.target.name)
  }

  const handleBlur = async () => {
    setFocusElement(null)
  }
  
  return (
    <>
      {
        isModalOpen
        ? <EmailSendModal 
            handleClose={() => setIsModalOpen(false)}
            email={userData.email}
            title="Active account"
            content="We sent you an e-mail to confirm your account. Please check your inbox and click on the link to activate your account."
            url="/auth/activate/resend-email"
          />
        : null
      }
      <form className="flex flex-col space-y-4 w-full" onSubmit={handleSubmit}>
        <AuthInput 
          type="text"
          placeholder="Firstname"
          name="firstname"
          handleWrite={handleWrite}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          value={userData.firstname}
          error={errors.firstname}
          isFocus={focusElement === 'firstname'}
        />
        <AuthInput 
          type="text"
          placeholder="Lastname"
          name="lastname"
          handleWrite={handleWrite}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          value={userData.lastname}
          error={errors.lastname}
          isFocus={focusElement === 'lastname'}
        />
        <AuthInput 
          type="email"
          placeholder="Email"
          name="email"
          handleWrite={handleWrite}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          value={userData.email}
          error={errors.email}
          isFocus={focusElement === 'email'}
        />
        <AuthInput
          type="password"
          placeholder="Password"
          name="password"
          handleWrite={handleWrite}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          value={userData.password}
          error={errors.password}
          isFocus={focusElement === 'password'}
        />
        <AuthButton isSubmitting={isSubmitting}>
          Register
        </AuthButton>
      </form>
    </>
  )
}
export default Form