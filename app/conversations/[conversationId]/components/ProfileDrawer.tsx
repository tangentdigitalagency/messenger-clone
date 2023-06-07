import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { Fragment, useMemo, useState } from "react";
import { format } from "date-fns";
import { Transition, Dialog } from "@headlessui/react";
import { IoClose, IoTrash } from "react-icons/io5";
import Avatar from "@/app/components/Avatar";
import Modal from "@/app/components/Modal";
import ConfirmModal from "./ConfirmModal";
import AvatarGroup from "@/app/components/AvatarGroup";
import Link from "next/link";
import useActiveList from "@/app/hooks/useActiveList";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const otherUser = useOtherUser(data);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { members } = useActiveList();
  const isActive = members?.indexOf(otherUser?.email!) !== -1;

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }
    return isActive ? "Online" : "Offline";
  }, [data, isActive]);

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden"
          onClose={onClose}
          static
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm"></div>
          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-500"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-500 scale-100"
            leaveFrom="opacity-10 0"
            leaveTo="opacity-0    scale-95"
          >
            <div className="flex items-center justify-center min-h-screen">
              <Dialog.Overlay className="fixed inset-0" />
              <div className="relative w-full max-w-md p-4 mx-auto bg-white rounded-lg shadow-xl">
                <div className="absolute top-0 right-0 p-2">
                  <button
                    className="text-gray-500 hover:text-gray-600"
                    onClick={onClose}
                    aria-label="Close"
                  >
                    <IoClose size={24} />
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <div className="mb-2">
                    {data.isGroup ? (
                      <AvatarGroup users={data.users} />
                    ) : (
                      <Avatar user={otherUser} />
                    )}
                  </div>
                  <div className="text-xl font-bold">{title}</div>
                  <div className="text-sm text-gray-500">{statusText}</div>
                  <div className="flex gap-10 my-8">
                    <div
                      onClick={() => setConfirmOpen(true)}
                      className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-75"
                    >
                      <div className="flex items-center justify-center w-10 h-10 transition duration-200 ease-out rounded-full bg-neutral-100 hover:bg-red-600 hover:text-white">
                        <IoTrash size={20} />
                      </div>
                      <div className="text-sm font-light text-neutral-600">
                        Delete
                      </div>
                    </div>
                  </div>
                  <div className="w-full pt-5 pb-5 sm:px-0 sm:pt-0">
                    <dl className="p-5 px-4 space-y-8 rounded-lg bg-sky-500 sm:space-y-6 sm:px-6">
                      {!data.isGroup && (
                        <div>
                          <dt className="font-medium text-white text-md sm:w-40 sm:flex-shrink-9">
                            Email
                          </dt>
                          <dd className="p-4 mt-1 font-bold text-gray-800 rounded-md bg-sky-200 text-md sm:col-span-2">
                            {otherUser.email}
                          </dd>
                        </div>
                      )}
                      {!data.isGroup ? (
                        <>
                          <hr />
                          <div>
                            <dt className="font-medium text-white text-md sm:w-40 sm:flex-shrink-0">
                              Joined
                            </dt>
                            <dd className="p-4 mt-1 font-medium text-gray-800 rounded-md bg-sky-200 text-md sm:col-span-2">
                              <time dateTime={joinedDate}>
                                Member Since:{" "}
                                <span className="font-bold">{joinedDate}</span>
                              </time>
                            </dd>
                          </div>
                        </>
                      ) : (
                        <>
                          <hr />
                          <div>
                            <dt className="font-medium text-white text-md sm:w-40 sm:flex-shrink-0">
                              {data.isGroup ? "Members" : "Member"}
                            </dt>
                            <dd className="p-4 mt-1 font-medium text-gray-800 rounded-md bg-sky-200 text-md sm:col-span-2">
                              {data.users.map((user) => (
                                // eslint-disable-next-line react/jsx-key
                                <div className="flex flex-row justify-between mb-3">
                         
                                 
                                  <div className="flex flex-row">
                                    <Avatar user={user} />
                                    <div className="flex flex-col mx-4">
                                      <div className="font-bold text-md">
                                        {user.name}
                                      </div>
                                      <div className="text-sm font-light text-gray-500">
                                        {user.email}
                                      </div>
                                    </div>
                                    </div>
                                </div>
                              ))}
                            </dd>
                          </div>
                        </>
                      )}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProfileDrawer;
