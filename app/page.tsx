import { Chat } from "@/components/chat"

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Chat with AI</h1>
      <Chat />
    </div>
  )
}

