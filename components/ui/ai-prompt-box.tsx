import React from "react";
import { ArrowUp } from "lucide-react";

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

// Auto-resizing textarea
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, value, ...props }, ref) => {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  React.useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 150)}px`;
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
        "rounded-2xl border border-[#444444] bg-[#1e1e1e] backdrop-blur-md p-3 shadow-[0_8px_30px_rgba(0,0,0,0.24)] transition-all duration-300 hover:border-[#555555]",
        className
      )}
    >
      <Textarea
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        className="flex-1 text-sm px-2"
      />

      <div className="flex items-center justify-between mt-2">
        {leftSlot && <div className="flex items-center shrink-0">{leftSlot}</div>}

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
  );
});
PromptInputBox.displayName = "PromptInputBox";
