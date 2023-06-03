"use client";
import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();

  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!session || session.status !== "authenticated") {
      router.push("/users");
    }
  }, [session, router]);
  

  const toggleVariant = useCallback(() => {
    setVariant((prevVariant) => (prevVariant === "LOGIN" ? "REGISTER" : "LOGIN"));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      const { password, confirmPassword } = data;

      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        setIsLoading(false);
        return;
      }

      axios.post('/api/register', data)
        .then(() => signIn('credentials', {
          ...data,
          redirect: false,
        }))
        .then((callback) => {
          if (callback?.error) {
            toast.error('Invalid credentials!');
          } else {
            toast.success('You Are Registered');
            router.push('/users');
          }
        })
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error('Invalid Login, Please Check Your Email and Password');
          } else {
            toast.success('Logged In');
            router.push('/users');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };
  const socialAction = (action: string) => {
    setIsLoading(true);
  
    signIn(action, { redirect: false })
      .then((result) => {

        console.log(result)
        // Check if the sign-in was successful
        if (!result?.error && result?.url) {
          // Redirect to the provided URL
          window.location.href = result.url;
        }
      })
      .finally(() => setIsLoading(false));
  };
  
  
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name"
              label="Name"
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email"
            label="Email address"
            type="email"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            label="Password"
            type="password"
          />

          {variant === "REGISTER" && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="confirmPassword"
              label="Confirm Password"
              type="password"
            />
          )}

          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center ">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white">
                Or continue with
              </span>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
              
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div className="flex justify-center gap-2 px-2 mt-6 text-sm text-gray-500 ">
          <div>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
