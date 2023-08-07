import { useEffect, useState } from "react";
import io, { Socket } from 'Socket.IO-client'

const useChat = () => {
    const [_, setSocket] = useState<Socket>()
    const [messages, setMessages] = useState<{
      message: string;
      user: string;
    }[]>([])

    useEffect(() => {
        const socket = io('http://localhost:3001')
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