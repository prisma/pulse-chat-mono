'use client';
import { useState } from "react";

const MessageInput = () => {
    const [message, setMessage] = useState('')
    const sendMessage = async (e: any) => {
        e.preventDefault();
        const newMessage = message;
        setMessage('')
        await fetch('/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message: newMessage})
        })
    }
    return <form id="text-input-container" className="pt-6 pb-12 w-full flex items-center justify-center" onSubmit={sendMessage}>
        <div className="text-center bg-white w-1/3 px-3 py-2 flex gap-3 rounded-xl drop-shadow-2xl">
            <input
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                id="message"
                className="focus:outline-none px-2 flex-1 rounded-xl"
                type="text"
                placeholder="What do you want to say?"
            />
            <button 
                type="submit" 
                className="rounded-xl px-3 py-2 bg-gray-600 text-gray-100 text-sm">
                    Send
            </button>
        </div>
    </form>
}

export default MessageInput;