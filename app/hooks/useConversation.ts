import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const useConversation = () => {

  const params = useParams();

  const conversationId = useMemo(() => {
    if (!params?.conversationoId) {
      return ''
    }

    return params?.conversationoId as string;
  }, [params?.conversationoId])


  const isOpen = useMemo(() => !!conversationId, [conversationId])

  return useMemo(() => ({
    isOpen,
    conversationId
  }), [isOpen, conversationId])
}

export default useConversation;