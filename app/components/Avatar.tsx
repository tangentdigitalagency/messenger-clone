'use client';

import { User } from "@prisma/client";
import Image from "next/image";
import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
  user?: User
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  
  const { members } = useActiveList();
  const isActive = members?.indexOf(user?.email!) !== -1;

  return ( 
    <div className="relative inline-flex items-center">
    <div className="relative inline-block overflow-hidden bg-white rounded-full ring-1 ring-white h-9 w-9 md:h-11 md:w-11">
      <Image alt='avatar' src={user?.image || '/images/avatar.png'} layout='fill' className='object-cover' />
    </div>
    
      {isActive && (
    <span className="absolute top-0 right-0 block w-2 h-2 bg-green-500 rounded-full ring-2 ring-white md:h-3 md:w-3"/>

      )}
  </div>
  
  
   );
}
 
export default Avatar;