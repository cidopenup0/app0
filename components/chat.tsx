'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Copy, Check } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
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
  const [selectedModel, setSelectedModel] = useState('gpt-oss-20b');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const modelOptions: ModelOption[] = [
    {
      id: 'gpt-oss-20b',
      name: 'GPT-OSS 20B',
      description: "OpenAI's tiny powerful open-source model",
      badge: 'Popular',
    },
    {
      id: 'gemma-3-27b',
      name: 'Gemma 3 27B',
      description: 'Google\'s multilingual model',
      badge: 'New',
    },
    {
      id: 'qwen-2.5-72b',
      name: 'Qwen 2.5 72B Instruct',
      description: 'Instruction-tuned model',
      badge: 'Pro',
    },
    {
      id: 'nemotron-nano-12b-v2',
      name: 'Nemotron Nano 12B V2',
      description: 'Nvidia\'s small multimodal model',
      badge: 'Multimodal',
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCopyCode = async (code: string, codeId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(codeId);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Custom code block component
  const CodeBlock = ({ inline, className, children, node, ...props }: any) => {
    // If it's inline code, just return plain code element
    if (inline) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    // For code blocks in tables or short single-line code, render without wrapper
    const codeString = String(children).replace(/\n$/, '');
    
    // Check if it's a short single-line code (likely inline code in tables or lists)
    if (!codeString.includes('\n') && codeString.length < 50) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    // Check if it's just plain text without language (avoid wrapping non-code content)
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    
    // If no language specified and it's plain text, render without wrapper
    if (!language || language === 'text') {
      return (
        <pre>
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      );
    }

    const codeId = `${language}-${codeString.substring(0, 20)}`;

    return (
      <div className="code-block-wrapper">
        <div className="code-block-header">
          <span className="code-language">{language}</span>
          <button
            className="code-copy-button"
            onClick={() => handleCopyCode(codeString, codeId)}
            title="Copy code"
          >
            {copiedCode === codeId ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy code</span>
              </>
            )}
          </button>
        </div>
        <pre>
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    );
  };

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
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex flex-col h-[calc(100vh-73px)] pb-[100px] bg-background overflow-x-auto">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full bg-background">
          <div className="flex justify-center min-h-full">
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)] text-center">
                  <p className="text-primary text-2xl sm:text-3xl lg:text-4xl font-medium px-4">
                    What can I help you with?
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
                        <div className="flex flex-col gap-1 w-full">
                          <div className={`rounded-lg ${
                            message.role === 'user' 
                              ? 'p-4 bg-muted dark:bg-[#303030]' 
                              : 'px-4 pt-4 pb-0 text-foreground dark:text-[#8b948d] w-full assistant-message-wrapper'
                          }`}>
                            <div className={`leading-relaxed break-words ${
                              message.role === 'assistant' ? 'text-base' : 'text-sm'
                            }`}>
                              {message.role === 'assistant' ? (
                                <>
                                  <ReactMarkdown 
                                    remarkPlugins={[remarkGfm]} 
                                    rehypePlugins={[rehypeHighlight]}
                                    components={{
                                      code: CodeBlock,
                                      td: ({ children, ...props }) => <td {...props}>{children}</td>,
                                      th: ({ children, ...props }) => <th {...props}>{children}</th>,
                                    }}
                                  >
                                    {message.content}
                                  </ReactMarkdown>                                
                                </>
                              ) : (
                                message.content
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleCopy(message.content, i)}
                            className={`text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 py-1 rounded hover:bg-muted/50 ${
                              message.role === 'user' ? 'px-2 pt-2 self-end' : 'px-4 self-start'
                            }`}
                            title="Copy message"
                          >
                            {copiedIndex === i ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-green-500" />
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-start gap-4 max-w-[85%]">                        
                        <div className="rounded-lg p-4 ">
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
              <SelectTrigger className="w-8 h-8 border-none bg-transparent text-white p-0.5 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all shadow-none focus:ring-0">
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
