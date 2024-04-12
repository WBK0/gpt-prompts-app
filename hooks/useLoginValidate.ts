export interface RegisterErrors{
  firstname: string | null,
  lastname: string | null,
  email: string | null,
  password: string | null
}

type LoginErrors = string | null;

export interface ResetPasswordErrors {
  password: string | null,
  passwordConfirmation: string | null
}


export const useLoginValidate = () => {
  const validateRegister = (userData : any) => {
    let errors: RegisterErrors = {
      firstname: null,
      lastname: null,
      email: null,
      password: null
    }
    if(userData.firstname.length < 2){
      errors.firstname = "First name is required and must be at least 2 characters";
    }
    if(userData.lastname.length < 2){
      errors.lastname = "Last name is required and must be at least 2 characters";
    }
    if(userData.firstname.length > 16){
      errors.firstname = "First name must be less than 16 characters";
    }
    if(userData.lastname.length > 16){
      errors.lastname = "Last name must be less than 16 characters";
    }
    if(!userData.email){
      errors.email = "Email is required";
    }
    if(!userData.password){
      errors.password = "Password is required";
    }
    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/g.test(userData.password)){
      errors.password = "Password must contain at least one uppercase letter, one lowercase letter and one number";
    }
    if(!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(userData.firstname)){
      errors.firstname = "First name must contain only letters";
    }
    if(!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(userData.lastname)){
      errors.lastname = "Last name must contain only letters";
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(userData.email)){
      errors.email = "Please enter a valid email";
    }
    return errors;
  }

  const validateLogin = (userData: any) => {
    let emailError: LoginErrors = null
    if(!userData.email){
      emailError = "Email is required";
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(userData.email)){
      emailError= "Please enter a valid email";
    }
    return emailError;
  }

  const validateResetPassword = (userData: any) => {
    let passwordsError : ResetPasswordErrors = {
      password: null,
      passwordConfirmation: null
    };
    if(!userData.password){
      passwordsError.password = "Password is required";
    }
    if(!userData.passwordConfirmation){
      passwordsError.passwordConfirmation = "Password confirmation is required";
    }
    if(userData.password !== userData.passwordConfirmation){
      passwordsError.passwordConfirmation = "Passwords do not match";
    }
    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/g.test(userData.password)){
      passwordsError.password = "Password must contain at least one uppercase letter, one lowercase letter and one number";
    }
    return passwordsError;
  }


  return { validateRegister, validateLogin, validateResetPassword };
}
