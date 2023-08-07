import MessageInput from "./components/MessageInput"
export default function Home() {
  return (
   <div className="w-full h-full flex flex-col">
    <div className="flex-1">
      <h2>Chats</h2>
    </div>
    <MessageInput />
   </div>
  )
}
