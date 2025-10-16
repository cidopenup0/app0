'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bot, User, Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('llama-3-70b');
  const [randomMessage, setRandomMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const modelOptions: ModelOption[] = [
    {
      id: 'llama-3-70b',
      name: 'Llama 3 70B',
      description: 'Meta\'s powerful language model',
      badge: 'Popular'
    },
    {
      id: 'gpt-5-nano',
      name: 'GPT-5 Nano',
      description: 'Compact but powerful AI model',
      badge: 'New'
    },
    {
      id: 'deepseek-r1',
      name: 'DeepSeek R1',
      description: 'Advanced reasoning capabilities',
      badge: 'Pro'
    },
    {
      id: 'kimi-k2-instruct',
      name: 'Kimi K2 Instruct',
      description: 'Instruction-tuned model',
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '52px';
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!input.trim()) {
      resetTextareaHeight();
    }
  }, [input]);

  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      resetTextareaHeight();
    }
  }, [isLoading, messages.length]);
  
  useEffect(() => {
    const messages = [
      "What's on your mind today?",
      "Ready to chat about anything!",
      "Ask me anything you'd like to know.",
      "Let's have a conversation!",
      "What can I help you with?",
      "Fire away with your questions!",
      "I'm here and ready to assist.",
      "What would you like to explore?"
    ];
    setRandomMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    resetTextareaHeight();
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, model: selectedModel }),
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
    <div className="relative flex flex-col h-[calc(100vh-73px)]">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex justify-center min-h-full">
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col min-h-[calc(100vh-73px)]">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center flex-1 text-center py-12">
                    <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-120px)] text-center">
                      <p className="text-primary text-2xl sm:text-3xl lg:text-4xl font-medium px-4">
                        {randomMessage}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                        <span>Current model: <span className="text-primary">{modelOptions.find(m => m.id === selectedModel)?.name}</span></span>
                        
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6 py-6 pb-40">
                    {messages.map((message, i) => (
                      <div
                        key={i}
                        className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`flex items-start gap-4 max-w-[85%] ${
                            message.role === 'user' ? 'flex-row-reverse' : ''
                          }`}
                        >
                          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-muted">
                            {message.role === 'assistant' ? (
                              <Bot className="w-5 h-5 text-primary" />
                            ) : (
                              <User className="w-5 h-5 text-primary" />
                            )}
                          </div>
                          <div className={`rounded-lg p-4 bg-muted max-w-[70%]`}>
                            <div className={`text-sm leading-relaxed break-words ${message.role === 'user' ? 'whitespace-pre-wrap ' : ''}`}>
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
                        <div className="flex items-start gap-4 max-w-[85%]">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-muted">
                            <Bot className="w-5 h-5 text-primary animate-pulse" />
                          </div>
                          <div className="rounded-lg p-4 bg-muted">
                            <div className="flex items-center gap-2 text-sm">
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
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
          </div>
        </ScrollArea>
      </div>

      {/* Fixed Input at Bottom */}
      <div className="border-t bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-5xl p-4">
          <form onSubmit={handleSubmit}>
            <div className="relative flex items-end bg-muted rounded-3xl border border-border/50 shadow-sm transition-all duration-200 min-h-[52px]">
              {/* Model Selector Button */}
              <div className="absolute left-3 bottom-3 z-10">
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-10 h-7 border-none bg-transparent p-0 hover:bg-muted-foreground/10 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-muted-foreground" />
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
              </div>

              {/* Message Input */}
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(Math.max(target.scrollHeight, 24), 200) + 'px';
                }}
                placeholder="Ask anything..."
                className="flex-1 min-h-[52px] max-h-[200px] resize-none border-0 bg-transparent pl-14 pr-14 py-[14px] text-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 overflow-y-auto no-scrollbar leading-6 flex items-center"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />

              {/* Send Button */}
              <div className="absolute right-3 bottom-3 z-10">
                <Button
                  type="submit"
                  size="sm"
                  disabled={isLoading || !input.trim()}
                  className={`rounded-full w-8 h-8 p-0 transition-all ${
                    input.trim() && !isLoading
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      : 'bg-muted-foreground/20 text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}