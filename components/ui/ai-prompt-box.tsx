import React from "react";
import { ArrowUp, Mic, MicOff } from "lucide-react";

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

// Auto-resizing textarea
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, value, onScroll, ...props }, ref) => {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  React.useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 300)}px`;
  }, [value]);

  return (
    <textarea
      ref={(node) => {
        textareaRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as any).current = node;
      }}
      value={value}
      rows={1}
      onScroll={onScroll}
      className={cn(
        "flex w-full border-none bg-transparent px-3 py-2.5 text-base text-gray-100 placeholder:text-gray-400 focus-visible:outline-none resize-none overflow-y-auto",
        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export const PromptInputBox = React.forwardRef<
  HTMLDivElement,
  {
    onSend?: (message: string) => void;
    placeholder?: string;
    className?: string;
    leftSlot?: React.ReactNode;
  }
>(({ onSend = () => {}, placeholder = "Type your message here...", className, leftSlot }, ref) => {
  const [input, setInput] = React.useState("");
  const [showBottomFade, setShowBottomFade] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [isTranscribing, setIsTranscribing] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const audioChunksRef = React.useRef<Blob[]>([]);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    setShowBottomFade(target.scrollTop < target.scrollHeight - target.clientHeight - 5);
  };

  React.useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      setShowBottomFade(el.scrollHeight > el.clientHeight);
    }
  }, [input]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        setIsTranscribing(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        
        try {
          const formData = new FormData();
          formData.append('audio', audioBlob, 'recording.wav');

          const response = await fetch('/api/speech-to-text', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API error: ${response.status} - ${errorData.error}`);
          }

          const data = await response.json();
          
          if (data.text) {
            setInput(prev => prev + (prev ? ' ' : '') + data.text);
          }
        } catch (error) {
          console.error('Transcription error:', error);
          // You might want to show a user-friendly error message here
        } finally {
          setIsTranscribing(false);
        }

        // Stop all tracks to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleSubmit = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  const hasContent = input.trim() !== "";

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-[#444444] bg-[#1e1e1e] backdrop-blur-md pt-1 p-3 shadow-[0_8px_30px_rgba(0,0,0,0.24)] transition-all duration-300 hover:border-[#555555]",
        className
      )}
    >
      <div className="relative">
        <Textarea
          ref={textareaRef}
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          className="flex-1 text-sm px-2"
        />

        {showBottomFade && (
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#1e1e1e] to-transparent pointer-events-none z-10" />
        )}
      </div>

      <div className="flex items-center justify-between mt-2">
        {leftSlot && <div className="flex items-center shrink-0">{leftSlot}</div>}

        <div className="flex items-center gap-2">
          {/* Microphone button */}
          <button
            onClick={toggleRecording}
            disabled={isTranscribing}
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
              isRecording
                ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                : isTranscribing
                ? "bg-yellow-500 text-white cursor-not-allowed"
                : "bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white"
            )}
            title={isRecording ? "Stop recording" : isTranscribing ? "Transcribing..." : "Start voice recording"}
          >
            {isTranscribing ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isRecording ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </button>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={!hasContent}
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
              hasContent
                ? "bg-white hover:bg-white/90 text-[#1F2023]"
                : "bg-white/10 text-gray-500 cursor-not-allowed"
            )}
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});
PromptInputBox.displayName = "PromptInputBox";
