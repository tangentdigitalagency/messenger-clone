'use client';

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { useMemo } from "react";

interface HeaderProps {
  conversation: Conversation & {
    user: User[]
  }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.user.length} members`
    }

    return 'Active now'
  }, [conversation])

  return ( 
    <div className="bg-white w-full flex border-r-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex items-center gap-3">

      </div>

    </div>
    );
}
 
export default Header;