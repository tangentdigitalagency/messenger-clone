'use client';

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { useMemo, useState } from "react";
import Link from 'next/link';
import { HiChevronDoubleLeft } from "react-icons/hi";
import Avatar from "@/app/components/Avatar";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  
  const otherUser = useOtherUser(conversation);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`
    }

    return 'Active now'
  }, [conversation])

  return ( 
    <>
      <ProfileDrawer data={conversation} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}/>
      <div className="bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg w-full flex border-r-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <Link href='/conversations' className="flex flex-row justify-center transition cursor-pointer lg:hidden text-sky-500 hover:text-sky-600">
           <HiChevronDoubleLeft size={32} />    
          </Link>

          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div className="text-lg font-bold">
              {conversation.name || otherUser?.name}
            </div>
            <div className="text-sm font-light text-neutral-500">
            {statusText}

            </div>
          </div>
        </div>

        <HiEllipsisHorizontal size={32} onClick={() => setDrawerOpen(true)} className="transition cursor-pointer text-sky-500 hover:text-sky-500"/>
        </div>
    </>
    );
}
 
export default Header;