import { useEffect, useState } from "react";
import io, { Socket } from 'Socket.IO-client'

const useChat = () => {
    const [_, setSocket] = useState<Socket>()
    const [messages, setMessages] = useState<{
      message: string;
      user: string;
    }[]>([])
    useEffect(() => {
        if ( !process.env.SERVER_URL ) throw new Error('SERVER_URL is not defined')
        const socket = io(process.env.SERVER_URL)
        setSocket(socket)
        socket.on('init-chat', (data) => {
          setMessages(data.reverse())
        })
        socket.on('chat', (data) => {
          setMessages((messages) => [...messages, data])
        })
        return () => {
          socket.close()
        }
    }, [setSocket])

    return messages
}

export default useChat