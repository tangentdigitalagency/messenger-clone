import PusherServer from 'pusher';
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: process.env.NEXT_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.NEXT_APP_SECRET!,
  cluster: 'us2',
  useTLS: true,
})

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  {
    cluster: 'us2',
    channelAuthorization: {
      endpoint: '/api/pusher/auth',
      transport: 'ajax'
    }
  }
)