import { useSession } from "next-auth/react";

const ChatMessage = ({ chat }: { chat: { user: string, message: string } }) => {
    const { data: session } = useSession()

    return <div className={`${session?.user.name === chat.user ? 'self-start bg-blue-300 text-left' : 'bg-gray-400 text-right'} max-w-md rounded-3xl px-4 py-2 text-xs`}>
       <h2 className="font-bold">{chat.user}</h2>
       <p>{chat.message}</p>
    </div>
}

export default ChatMessage;