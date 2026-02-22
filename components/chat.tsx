'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Copy, Check, ChevronDown, ArrowDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { PromptInputBox } from '@/components/ui/ai-prompt-box';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
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
  provider?: string;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('openai/gpt-oss-120b:free');
  const [selectedProvider, setSelectedProvider] = useState<'Google' | 'Meta' | 'OpenAI'>('OpenAI');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [expandedMessages, setExpandedMessages] = useState<Set<number>>(new Set());
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);  
  
  const allModels: ModelOption[] = [
    {
      id: 'google/gemma-3-4b-it:free',
      name: 'Gemma 3 4B',
      description: 'Fast and efficient for everyday questions',
      provider: 'Google',
    },
    {
      id: 'google/gemma-3-12b-it:free',
      name: 'Gemma 3 12B',
      description: 'Balanced performance and quality',
      provider: 'Google',
    },
    {
      id: 'google/gemma-3-27b-it:free',
      name: 'Gemma 3 27B',
      description: 'Powerful model for complex questions',
      provider: 'Google',
    },
    {
      id: 'meta-llama/llama-3.2-3b-instruct:free',
      name: 'Llama 3.2 3B',
      description: 'Lightweight and responsive',
      provider: 'Meta',
    },
    {
      id: 'meta-llama/llama-3.3-70b-instruct:free',
      name: 'Llama 3.3 70B',
      description: 'Advanced reasoning and details',
      provider: 'Meta',
    },
    {
      id: 'openai/gpt-oss-20b:free',
      name: 'GPT OSS 20B',
      description: 'Solid general performance',
      provider: 'OpenAI',
    },
    {
      id: 'openai/gpt-oss-120b:free',
      name: 'GPT OSS 120B',
      description: 'Most powerful open-source model',
      provider: 'OpenAI',
    },
  ];
  
  const modelOptions = allModels;
  
  const modelsByProvider = {
    Google: allModels.filter(m => m.provider === 'Google').sort((a, b) => a.name.localeCompare(b.name)),
    Meta: allModels.filter(m => m.provider === 'Meta').sort((a, b) => a.name.localeCompare(b.name)),
    OpenAI: allModels.filter(m => m.provider === 'OpenAI').sort((a, b) => a.name.localeCompare(b.name)),
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
        setShowScrollButton(distanceFromBottom > 100);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

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

  const toggleMessageExpansion = (index: number) => {
    setExpandedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const CodeBlock = ({ inline, className, children, ...props }: any) => {
    const codeString = String(children).replace(/\n$/, '');
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    const codeId = `${language}-${codeString.substring(0, 20)}`;

    // Inline code style
    if (inline || !match) {
      return (
        <code
          className="px-1.5 py-0.5 rounded-md bg-[#1e1e1e] text-blue-150 text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }

    const handleCopyClick = () => {
      navigator.clipboard.writeText(codeString);
      setCopiedCode(codeId);
      setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
      <div className="relative my-3 rounded-xl overflow-hidden border border-neutral-800 bg-[#0d1117]">
        <div className="flex justify-between items-center px-3 py-2 bg-[#161b22] border-b border-neutral-800 text-xs text-gray-400 font-mono">
          <span>{match[1]}</span>
          <button
            className="flex items-center gap-1.5 text-gray-400 hover:text-gray-200 transition"
            onClick={handleCopyClick}
          >
            {copiedCode === codeId ? (
              <>
                <Check className="w-3 h-3" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy code</span>
              </>
            )}
          </button>
        </div>
        <SyntaxHighlighter
          language={match[1]}
          style={oneDark}
          PreTag="div"
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
            fontSize: "0.9rem",
            lineHeight: "1.5",
          }}
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    );
  };

  async function handleSend(message: string, files?: File[]) {
    if (!message.trim() || isLoading) return;

    const newMessage: Message = { role: 'user', content: message };
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    try {
      // Send the entire conversation history for context
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, newMessage],
          model: selectedModel 
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, there was an error processing your request. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex flex-col h-[calc(100vh-73px)] pb-[100px] bg-background overflow-x-auto">
      <div className="flex-1 overflow-x-auto">
        <div
          ref={scrollContainerRef}
          className={`h-full bg-background overflow-x-hidden ${messages.length > 0 ? 'overflow-y-auto' : 'overflow-y-hidden'}`}
        >
          <div className="flex justify-center min-h-full">
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
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
                          message.role === 'user' ? 'flex-row-reverse max-w-[55%]' : 'w-full'
                        }`}
                      >
                        <div className="flex flex-col gap-1 w-full group">
                          <div
                            className={`rounded-lg ${
                              message.role === 'user'
                                ? 'p-4 bg-muted dark:bg-[#303030]'
                                : 'px-4 pt-4 pb-0 text-foreground dark:text-[#8b948d] assistant-message-wrapper'
                            }`}
                          >
                            <div
                              className={`leading-relaxed break-words text-base`}
                            >
                              {message.role === 'assistant' ? (
                                <ReactMarkdown
                                  remarkPlugins={[remarkGfm]}
                                  components={{
                                    code: CodeBlock,
                                  }}
                                >
                                  {message.content}
                                </ReactMarkdown>
                              ) : (
                                <>
                                  <div
                                    className={`user-message-bubble-color relative rounded-[18px] ${
                                      !expandedMessages.has(i) && message.content.length > 150
                                        ? 'max-h-[100px] overflow-hidden'
                                        : ''
                                    }`}
                                    data-multiline={message.content.includes('\n') ? '' : undefined}
                                  >
                                    <div className="whitespace-pre-wrap font-sans leading-relaxed text-foreground">
                                      {message.content}
                                    </div>
                                    {!expandedMessages.has(i) && message.content.length > 150 && (
                                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#303030] dark:from-[#303030] to-transparent pointer-events-none" />
                                    )}
                                  </div>
                                  {message.content.length > 150 && (
                                    <button
                                      onClick={() => toggleMessageExpansion(i)}
                                      className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                      <ChevronDown
                                        className={`w-3.5 h-3.5 transition-transform ${
                                          expandedMessages.has(i) ? 'rotate-180' : ''
                                        }`}
                                      />
                                      <span>{expandedMessages.has(i) ? 'Show less' : 'Show more'}</span>
                                    </button>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleCopy(message.content, i)}
                            className={`text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 py-1 px-2 pt-2 rounded hover:bg-muted/50 ${
                              message.role === 'user'
                                ? 'self-end opacity-0 group-hover:opacity-100'
                                : 'self-start opacity-100 ml-2'
                            }`}
                            title="Copy message"
                          >
                            {copiedIndex === i ? (
                              <Check className="w-3.5 h-3.5 text-green-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
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
        </div>
      </div>

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-10">
          <button
            onClick={scrollToBottom}
            className="flex items-center justify-center w-9 h-9 bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-[#444444] rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Scroll to bottom"
          >
            <ArrowDown className="w-5 h-5 text-white" />
          </button>
        </div>
      )}

      {/* Fixed floating input box */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4">
        <PromptInputBox
          onSend={handleSend}
          placeholder="Ask anything..."
          leftSlot={
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-8 h-8 border-none bg-transparent text-white p-0.5 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all shadow-none">
                <Bot className="w-4 h-4 text-white" />
              </SelectTrigger>
              <SelectContent align="start" className="w-96">
                {/* Provider Tabs */}
                <div className="flex border-b border-border/50 p-1 gap-1 sticky top-0 bg-popover">
                  {['Google', 'Meta', 'OpenAI'].map((provider) => (
                    <button
                      key={provider}
                      onClick={() => setSelectedProvider(provider as 'Google' | 'Meta' | 'OpenAI')}
                      className={`flex-1 px-1 py-2 text-sm font-medium rounded-md transition-colors ${
                        selectedProvider === provider
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      {provider}
                    </button>
                  ))}
                </div>
                {/* Models for selected provider */}
                <div className="max-h-80 overflow-y-auto">
                  {modelsByProvider[selectedProvider]?.map((model) => (
                    <SelectItem key={model.id} value={model.id} className="py-3">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">{model.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {model.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>
          }
        />
      </div>
    </div>
  );
}
