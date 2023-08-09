import { useEffect, useState } from "react";
import io, { Socket } from 'socket.io-client'
import type { Message } from "../types/shared";
const useChat = () => {
    const [_, setSocket] = useState<Socket>()
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        if ( !process.env.NEXT_PUBLIC_SERVER_URL ) throw new Error('NEXT_PUBLIC_SERVER_URL is not defined')
        const socket = io(process.env.NEXT_PUBLIC_SERVER_URL)

        setSocket(socket)
      
        socket.on('init-chat', (data) => {
          setMessages(data.reverse())
        })

        socket.on('chat', (data) => {
          setMessages((messages) => [...messages, data])
        })
        
        return () => { socket.close() }
        
    }, [setSocket])

    return messages
}

export default useChat