'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, User } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PromptInputBox } from '@/components/ui/ai-prompt-box';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ModelOption {
  id: string;
  name: string;
  description: string;
  badge?: string;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('llama-3-70b');
  const [randomMessage, setRandomMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const modelOptions: ModelOption[] = [
    {
      id: 'llama-3-70b',
      name: 'Llama 3 70B',
      description: "Meta's powerful language model",
      badge: 'Popular',
    },
    {
      id: 'gpt-5-nano',
      name: 'GPT-5 Nano',
      description: 'Compact but powerful AI model',
      badge: 'New',
    },
    {
      id: 'deepseek-r1',
      name: 'DeepSeek R1',
      description: 'Advanced reasoning capabilities',
      badge: 'Pro',
    },
    {
      id: 'kimi-k2-instruct',
      name: 'Kimi K2 Instruct',
      description: 'Instruction-tuned model',
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const greetings = [
      "What's on your mind today?",
      'Ready to chat about anything!',
      "Ask me anything you'd like to know.",
      "Let's have a conversation!",
      'What can I help you with?',
      'Fire away with your questions!',
      "I'm here and ready to assist.",
      'What would you like to explore?',
    ];
    setRandomMessage(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);

  async function handleSend(message: string, files?: File[]) {
    if (!message.trim() || isLoading) return;

    const newMessage: Message = { role: 'user', content: message };
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, model: selectedModel }),
      });

      if (!response.ok) throw new Error('Failed to get response');
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.'
      },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex flex-col h-[calc(100vh-73px)] pb-[100px]">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex justify-center min-h-full">
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)] text-center">
                  <p className="text-primary text-2xl sm:text-3xl lg:text-4xl font-medium px-4">
                    {randomMessage}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                    <span>
                      Current model:{' '}
                      <span className="text-primary">
                        {modelOptions.find((m) => m.id === selectedModel)?.name}
                      </span>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-6 py-6">
                  {messages.map((message, i) => (
                    <div
                      key={i}
                      className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`flex items-start gap-4 ${
                          message.role === 'user' ? 'flex-row-reverse max-w-[85%]' : 'w-full'
                        }`}
                      >                    
                        <div className={`rounded-lg p-4 ${
                          message.role === 'user' ? 'bg-muted' : 'bg-muted w-full'
                        }`}>
                          <div className="text-sm leading-relaxed break-words">
                            {message.role === 'assistant' ? (
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {message.content}
                              </ReactMarkdown>
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
                      <div className="flex items-start gap-4 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-muted">
                          <Bot className="w-5 h-5 text-primary animate-pulse" />
                        </div>
                        <div className="rounded-lg p-4 bg-muted">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="flex gap-1">
                              <div
                                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                style={{ animationDelay: '0ms' }}
                              />
                              <div
                                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                style={{ animationDelay: '150ms' }}
                              />
                              <div
                                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                style={{ animationDelay: '300ms' }}
                              />
                            </div>
                            <span className="text-muted-foreground">Thinking...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Fixed floating input box */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4">
        <PromptInputBox
          onSend={handleSend}
          placeholder="Ask anything..."
          leftSlot={
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-8 h-8 border-none bg-transparent p-0.5 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all shadow-none focus:ring-0">
                <Bot className="w-4 h-4 text-white" />
              </SelectTrigger>
              <SelectContent align="start" className="w-80">
                {modelOptions.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    <div className="flex flex-col gap-1 py-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{model.name}</span>
                        {model.badge && (
                          <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                            {model.badge}
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{model.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          }
        />
      </div>
    </div>
  );
}
