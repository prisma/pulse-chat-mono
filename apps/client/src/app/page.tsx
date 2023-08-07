"use client";

import MessageInput from "./components/MessageInput"
import { useRef, useEffect } from 'react'
import ChatMessage from "./components/ChatMessage";
import useChat from './hooks/useChat';

export default function Home() {
  const messagesEndRef = useRef<HTMLInputElement>(null)
  const messages = useChat()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
   <div className="w-full h-full flex flex-col">
    { messages.length }
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
