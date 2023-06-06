'use client';

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentUser }) => {
  
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    }
  });

  const image = watch('image');

  const handleUpload = (result: any) => {
    setValue('image', result?.info?.secure_url, {
      shouldValidate: true,
    });
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    setIsLoading(true);

    axios.post('/api/settings', data)
      .then(() => {
        router.refresh();
        onClose()
      })
      .catch((error: any) => {
        toast.error('Something went wrong, please try again.')
      })
      .finally(() => {
        setIsLoading(false);
      })
  }
  


  return ( 
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="pb-12 border-b border-gray-900/10">
            <h2 className="text-xl font-bold leading-7 text-gray-900">
              Your Profile

            </h2>
            <p className="mt-1 font-semibold leading-6 text-gray-600 text-md">
              Edit Your Profile

            </p>
            <div className="flex flex-col mt-10 gap-y-8">
            <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Photo
                </label>
                <div className="flex items-center mt-2 gap-x-3">
                  <Image width={52} height={52} className="rounded-full" src={image || currentUser?.image || '/images/avatar.png'} alt="avatar" />
                  
                  <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset="fd0njny8">
                    <Button disabled={isLoading} secondary type="button">
                      Change
                    </Button>
                  </CldUploadButton>

                </div>
              </div>
              <Input disabled={isLoading} label="Name" id="name" required register={register} errors={errors}/>
            </div>

          </div>

          <div className="flex items-center justify-end mt-6 gap-x-6">
            <Button secondary disabled={isLoading} type="button" onClick={onClose}>
              Cancel
            </Button>

            <Button  disabled={isLoading} type="submit">
              Save
            </Button>

          </div>

        </div>
      </form>
    </Modal>
   );
}
 
export default SettingsModal;