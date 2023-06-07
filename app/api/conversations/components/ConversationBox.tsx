"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";

interface ConversationBoxProps {
  data: FullConversationType;
  selected: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenArray = lastMessage.seen || [];

    if (!userEmail) return false;

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an attachment";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Start a conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(`w-full relative flex items-center p-2 mb-1 space-x-3 hover:bg-neutral-200 rounded-lg transition cursor-pointer `,selected ? " bg-gradient-to-r from-sky-500 to-indigo-400" : "bg-neutral-50"
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users}/>
      ) : (
        <Avatar user={otherUser} />
      )}
     
      <div className="flex-1 min-w-0">
        <div className="focus:outline-none">
          <div className="flex items-center justify-between mb-1">
            <p className={clsx(`font-medium text-gray-900 text-md`, selected ? "text-white" : "")}>
              {data.name || otherUser?.name}
            </p>
            {lastMessage?.createdAt && (
              <p className={clsx(`text-xs font-light text-gray-400`, selected ? "text-white" : "")}>
                {format(new Date(lastMessage.createdAt), "p")} <br/>
                {format(new Date(lastMessage.createdAt), "MM/dd/yyyy")}
              </p>
             
            )}

          </div>
          <p className={clsx(`truncate text-sm`, hasSeen ? 'text-gray-500' : 'text-black font-medium', selected ? "text-white" : "")}>
            {lastMessageText}
          </p>

         
        </div>

      </div>
      <span className={clsx(hasSeen ? 'hidden' : 'absolute top-0 right-0 block w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white md:h-3 md:w-3 animate-pulse')}/>
    </div>
  );
};

export default ConversationBox;
