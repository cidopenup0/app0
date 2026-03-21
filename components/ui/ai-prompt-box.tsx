import React from "react";
import { ArrowUp, Mic, MicOff } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SpeechRecognitionAlternative = {
  transcript: string;
};

type SpeechRecognitionResultLike = {
  isFinal: boolean;
  0: SpeechRecognitionAlternative;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
};

type SpeechRecognitionErrorEventLike = {
  error: string;
  message?: string;
};

type BrowserSpeechRecognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

type WindowWithSpeechRecognition = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

type SpeechLocale = "hi-IN" | "en-IN" | "kn-IN" | "te-IN" | "ta-IN";

const speechLocaleOptions: Array<{ code: SpeechLocale; label: string; short: string }> = [
  { code: "en-IN", label: "English (India)", short: "EN" },
  { code: "kn-IN", label: "Kannada (India)", short: "ಕನ್ನಡ" },
  { code: "hi-IN", label: "Hindi (India)", short: "हिंदी" },
  { code: "te-IN", label: "Telugu (India)", short: "తెలుగు" },
  { code: "ta-IN", label: "Tamil (India)", short: "தமிழ்" },
];

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");
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
        "flex w-full border-none bg-transparent px-3 py-2.5 text-base text-gray-100 placeholder:text-gray-400 resize-none overflow-y-auto outline-none focus:outline-none",
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
  const [error, setError] = React.useState<string | null>(null);
  const [speechLocale, setSpeechLocale] = React.useState<SpeechLocale>("hi-IN");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const recognitionRef = React.useRef<BrowserSpeechRecognition | null>(null);
  const transcriptBufferRef = React.useRef("");

  const isSpeechRecognitionSupported = React.useMemo(() => {
    if (typeof window === "undefined") return false;
    const speechWindow = window as WindowWithSpeechRecognition;
    return Boolean(speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition);
  }, []);

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

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const preferred = [navigator.language, ...(navigator.languages || [])]
      .map((lang) => lang?.toLowerCase())
      .find(Boolean);

    if (!preferred) {
      setSpeechLocale("en-IN");
      return;
    }

    if (preferred.startsWith("kn")) {
      setSpeechLocale("kn-IN");
      return;
    }

    if (preferred.startsWith("te")) {
      setSpeechLocale("te-IN");
      return;
    }

    if (preferred.startsWith("ta")) {
      setSpeechLocale("ta-IN");
      return;
    }

    if (preferred.startsWith("hi")) {
      setSpeechLocale("hi-IN");
      return;
    }

    setSpeechLocale("en-IN");
  }, []);

  React.useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    if (!isSpeechRecognitionSupported) {
      setError("Browser speech recognition is not supported here.");
      setTimeout(() => setError(null), 4000);
      return;
    }

    try {
      const speechWindow = window as WindowWithSpeechRecognition;
      const SpeechRecognitionImpl =
        speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;

      if (!SpeechRecognitionImpl) {
        throw new Error("Speech recognition is unavailable.");
      }

      setError(null);
      setIsTranscribing(false);
      transcriptBufferRef.current = "";

      const recognition = new SpeechRecognitionImpl();
      recognition.lang = speechLocale;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        let finalizedText = "";

        for (let i = event.resultIndex; i < event.results.length; i += 1) {
          const result = event.results[i];
          const transcript = result?.[0]?.transcript?.trim();
          if (!transcript) continue;

          if (result.isFinal) {
            finalizedText += `${finalizedText ? " " : ""}${transcript}`;
          }
        }

        if (finalizedText) {
          transcriptBufferRef.current = `${transcriptBufferRef.current} ${finalizedText}`.trim();
        }
      };

      recognition.onerror = (event) => {
        const recognizedError = event.error || "unknown";
        if (recognizedError !== "aborted") {
          const message =
            recognizedError === "not-allowed"
              ? "Microphone access was blocked. Please allow microphone permissions."
              : `Speech recognition failed (${recognizedError}).`;
          setError(message);
          setTimeout(() => setError(null), 5000);
        }
        setIsRecording(false);
        setIsTranscribing(false);
      };

      recognition.onend = () => {
        const transcript = transcriptBufferRef.current.trim();
        if (transcript) {
          setInput((prev) => `${prev}${prev ? " " : ""}${transcript}`);
        }

        transcriptBufferRef.current = "";
        recognitionRef.current = null;
        setIsRecording(false);
        setIsTranscribing(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
      setIsRecording(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Could not start browser speech recognition.";
      setError(errorMessage);
      setTimeout(() => setError(null), 5000);
      setIsRecording(false);
      setIsTranscribing(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      setIsTranscribing(true);
      recognitionRef.current.stop();
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
  const selectedSpeechOption =
    speechLocaleOptions.find((option) => option.code === speechLocale) ?? speechLocaleOptions[0];

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

      {error && (
        <div className="mt-2 px-3 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-sm text-red-400 animate-in slide-in-from-top-2">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        {leftSlot && <div className="flex items-center shrink-0">{leftSlot}</div>}

        <div className="flex items-center gap-2">
          <Select
            value={speechLocale}
            onValueChange={(value) => setSpeechLocale(value as SpeechLocale)}
            disabled={isRecording || isTranscribing}
          >
            <SelectTrigger
              title={`Speech language: ${selectedSpeechOption.label}`}
              className={cn(
                "h-8 w-[76px] shrink-0 rounded-lg border border-white/10 px-2 text-xs font-semibold tracking-wide",
                "bg-[#2b2b2b] text-gray-200 hover:bg-[#353535] hover:text-white",
                "focus:ring-0 focus:ring-offset-0",
                "data-[placeholder]:text-gray-300"
              )}
            >
              <SelectValue>{selectedSpeechOption.short}</SelectValue>
            </SelectTrigger>
            <SelectContent align="end" className="min-w-[190px]">
              {speechLocaleOptions.map((option) => (
                <SelectItem key={option.code} value={option.code} className="text-sm">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <button
            onClick={toggleRecording}
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
              isRecording
                ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                : isTranscribing
                ? "bg-yellow-500 text-white cursor-not-allowed"
                : "bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white"
            )}
            title={
              isRecording
                ? "Stop listening"
                : isTranscribing
                ? "Finalizing speech..."
                : isSpeechRecognitionSupported
                ? `Start voice input (${speechLocaleOptions.find((item) => item.code === speechLocale)?.label || speechLocale})`
                : "Speech recognition is not supported in this browser"
            }
          >
            {isTranscribing ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isRecording ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </button>

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
