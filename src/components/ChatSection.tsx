import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { sendStreamRequest } from "@/lib/sse";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  {
    label: "最近在忙什么？",
    sub: "What are you working on?",
    value: "最近在忙什么？",
  },
  {
    label: "怎么联系你？",
    sub: "How can I contact you?",
    value: "怎么联系你？",
  },
  {
    label: "未来的计划？",
    sub: "What are your future plans?",
    value: "未来的计划？",
  },
];

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "嗨！我是 chench 的数字分身 👋 关于他的工作、兴趣、或者任何你想知道的，都可以问我～",
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = async (text: string) => {
    const userMessage = text.trim();
    if (!userMessage || isStreaming) return;

    setInput("");
    const userMsg: Message = { role: "user", content: userMessage };
    setMessages((prev) => [...prev, userMsg]);
    setIsStreaming(true);

    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMsg]);

    abortRef.current = new AbortController();

    await sendStreamRequest({
      functionUrl: `${supabaseUrl}/functions/v1/chench-avatar`,
      requestBody: {
        messages: [...messages, userMsg].map((m) => ({
          role: m.role,
          content: m.content,
        })),
      },
      supabaseAnonKey,
      onData: (data) => {
        if (data === "[DONE]") return;
        try {
          const parsed = JSON.parse(data);
          const chunk = parsed.choices?.[0]?.delta?.content ?? "";
          if (chunk) {
            setMessages((prev) => {
              const updated = [...prev];
              const lastMsg = updated[updated.length - 1];
              if (lastMsg.role === "assistant") {
                updated[updated.length - 1] = {
                  ...lastMsg,
                  content: lastMsg.content + chunk,
                };
              }
              return updated;
            });
          }
        } catch {
          // Skip unparseable frames
        }
      },
      onComplete: () => setIsStreaming(false),
      onError: (error) => {
        console.error("Stream error:", error);
        setIsStreaming(false);
        setMessages((prev) => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];
          if (lastMsg.role === "assistant" && !lastMsg.content) {
            updated[updated.length - 1] = {
              ...lastMsg,
              content: "抱歉，出了点问题，请再试一次 🙏",
            };
          }
          return updated;
        });
      },
      signal: abortRef.current.signal,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <div className="flex flex-col h-full bg-muted/40 rounded-2xl border border-border/30 overflow-hidden shadow-sm">
      {/* Chat Header */}
      <div className="flex items-center gap-2 px-4 py-3.5">
        <h2 className="text-base font-semibold text-foreground">
          💬 和 chench 聊聊
        </h2>
      </div>

      {/* Messages Area */}
      <ScrollArea ref={scrollRef} className="flex-1 min-h-0">
        <div className="p-4 space-y-4">
          {messages.map((msg, idx) => (
            <MessageBubble
              key={idx}
              message={msg}
              isLast={idx === messages.length - 1}
              isStreaming={
                isStreaming &&
                idx === messages.length - 1 &&
                msg.role === "assistant"
              }
            />
          ))}
        </div>
      </ScrollArea>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-3">
          <p className="text-xs text-muted-foreground/70 mb-2">
            试试看：
          </p>
          <div className="flex flex-col gap-2 items-start">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q.value}
                type="button"
                onClick={() => handleSend(q.value)}
                className="text-left px-3 py-1.5 rounded-lg border border-border/50 bg-background/60 hover:bg-accent/80 transition-colors w-full"
              >
                <span className="text-sm text-foreground">{q.label}</span>
                <span className="text-xs text-muted-foreground/60 ml-2">
                  {q.sub}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 p-3 bg-muted/20"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="想问什么？随便聊～"
          disabled={isStreaming}
          className="flex-1 min-w-0 px-3 py-2 text-sm bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/40 placeholder:text-muted-foreground/60 disabled:opacity-50 transition-shadow"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || isStreaming}
          className="shrink-0 h-9 w-9 rounded-lg"
        >
          {isStreaming ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </form>
    </div>
  );
}

function MessageBubble({
  message,
  isLast,
  isStreaming,
}: {
  message: Message;
  isLast: boolean;
  isStreaming: boolean;
}) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <Avatar className="w-7 h-7 shrink-0">
        <AvatarFallback
          className={
            isUser
              ? "bg-primary text-primary-foreground text-xs"
              : "bg-muted text-muted-foreground text-xs"
          }
        >
          {isUser ? (
            <User className="w-4 h-4" />
          ) : (
            <Bot className="w-4 h-4" />
          )}
        </AvatarFallback>
      </Avatar>
      <div
        className={`max-w-[80%] md:max-w-[70%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        }`}
      >
        <span
          className={
            isStreaming && isLast && !message.content ? "typing-cursor" : ""
          }
        >
          {message.content || (isStreaming ? "" : "...")}
        </span>
      </div>
    </div>
  );
}
