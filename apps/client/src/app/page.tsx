"use client";

import MessageInput from "./components/MessageInput"
import io, { Socket } from 'Socket.IO-client'
import { useRef, useEffect, useState } from 'react'
import ChatMessage from "./components/ChatMessage";

export default function Home() {
  const [_, setSocket] = useState<Socket>()
  const messagesEndRef = useRef<HTMLInputElement>(null)
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
   <div className="w-full h-full flex flex-col">
    <div className="flex-1 overflow-scroll flex flex-col items-end gap-y-2 px-12 py-4 w-1/2 mx-auto">
       {
          messages.map((message, index) => 
            <ChatMessage key={index} chat={message} />
          )
       }
       <div ref={messagesEndRef} />
    </div>
    <MessageInput />
   </div>
  )
}
