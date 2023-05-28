"use client";
import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

type Varient = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [varient, setVarient] = useState<Varient>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVarient = useCallback(() => {
    if (varient === "LOGIN") {
      setVarient("REGISTER");
    } else {
      setVarient("LOGIN");
    }
  }, [varient]);

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

    

    if (varient === "REGISTER") {

      let password = data.password;
    let confirmPassword = data.confirmPassword;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
      }
      
      axios.post("/api/register", data)
        .catch(() => {
          toast.error("Error registering user");
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
    if (varient === "LOGIN") {
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          toast.success('Logged in successfully!');
        }
      })
      .finally(() => setIsLoading(false))
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true);

    //TODO: NextAuthSocial Sign In
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {varient === "REGISTER" && (
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

          {varient === "REGISTER" && (
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
              {varient === "LOGIN" ? "Sign in" : "Register"}
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
            {varient === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVarient} className="underline cursor-pointer">
            {varient === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
