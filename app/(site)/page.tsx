
import Image from "next/image";
import AuthForm from "./components/AuthForm";

const Auth = () => {
  return (
    <div className='flex flex-col justify-center min-h-full py-12 bg-gradient-to-r from-sky-500 to-indigo-500 sm:px-6 lg:px-8 bg'>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          height="48"
          width="48"
          className="w-auto mx-auto"
          src="/images/logo.png"
          alt="Logo"
        />
        <h2 
          className="mt-6 text-3xl font-bold tracking-tight text-center text-white "
          >
           Welcome To Messenger
        </h2>
      </div>
      <AuthForm />      
  </div>
  )
}

export default Auth;

