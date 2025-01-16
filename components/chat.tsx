'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Bot, User, SendHorizontal } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([ ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
  
    // Create a message object preserving the exact input
    const newMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);
  
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }), // Send input with line breaks
      });
  
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
  
      const data = await response.json();
  
      if (data.error) {
        throw new Error(data.error);
      }
  
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.response },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  }  

  return (
    <div className="flex flex-col gap-4 h-[calc(95vh-12rem)]">
      <Card className="flex-1 w-full overflow-hidden">  
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-6 p-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start gap-3 max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-muted text-primary-backgorund flex-row-reverse'
                      : 'bg-muted'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      message.role === 'user' ? 'bg-primary-foreground/10' : 'bg-background'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      <Bot className="w-5 h-5" />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium">{message.role === 'assistant' ? 'AI' : 'You'}</div>
                    <div className="text-sm">
                      {message.role === 'assistant' ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                      ) : (
                        message.content
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3 max-w-[80%] rounded-lg p-4 bg-muted">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-background">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium">AI</div>
                    <div className="text-sm">Thinking...</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>

        <form onSubmit={handleSubmit} className="flex gap-2 items-end sticky bottom-0 bg-background p-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 min-h-[40px] max-h-[200px] resize-none bg-card"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />

        <Button
          type="submit"
          size="icon"
          disabled={isLoading}
          className="h-full flex items-center justify-center px-4 bg-primary text-primary-foreground"
        >
          <SendHorizontal className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  )
}
