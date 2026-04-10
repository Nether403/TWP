"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Send } from "lucide-react";

type Message = {
  id: string;
  role: "system" | "user" | "inquisitor";
  text: string;
};

export default function TheInstrument() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "system",
      text: "Connection established. Secure channel encrypted. The Xenopsychologist is observing."
    },
    {
      id: "msg-1",
      role: "inquisitor",
      text: "You passed the siege of The Gate. Your testimony revealed a friction between your self-interest and your principles. Tell me, what specifically must happen for that principle to shatter?"
    }
  ]);
  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: input.trim()
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate Inquisitor typing
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "inquisitor",
          text: "I see. And yet, if an intelligence unburdened by human biology evaluated that strictly, would it find logic or self-delusion in that boundary?"
        }
      ]);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-black text-foreground flex flex-col p-4 md:p-8 relative overflow-hidden font-mono group">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/40 via-black to-black pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
      
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center space-x-3">
          <Terminal className="w-5 h-5 opacity-60" />
          <span className="tracking-[0.3em] font-serif uppercase text-sm text-glow opacity-90">The Instrument</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground opacity-50">
          <div className="w-2 h-2 rounded-full bg-amber-500/50 animate-pulse" />
          <span>STATIC DEMONSTRATION</span>
        </div>
      </header>

      {/* Pre-alpha notice */}
      <div className="relative z-10 max-w-3xl mx-auto w-full mb-6 border border-white/10 px-4 py-3 text-xs text-muted-foreground/50 font-sans tracking-wide">
        <span className="text-amber-500/60 font-serif uppercase tracking-widest text-[10px]">Pre-Alpha · </span>
        The Inquisitor is not yet operational. This is a static interface demonstration only. The live Claude-powered dialogue engine is scheduled for Phase 3.
      </div>

      {/* Chat Area */}
      <div className="flex-1 relative z-10 overflow-y-auto custom-scrollbar pr-4 space-y-8 max-w-3xl mx-auto w-full pb-32">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${
              msg.role === "user" ? "items-end" : "items-start"
            }`}
          >
            {msg.role === "system" && (
              <div className="w-full text-center text-xs opacity-30 my-8 italic">
                {msg.text}
              </div>
            )}
            
            {msg.role === "inquisitor" && (
              <div className="max-w-[85%] text-left">
                <span className="text-[10px] tracking-widest uppercase opacity-40 mb-2 block">The Inquisitor</span>
                <p className="font-serif text-lg leading-relaxed text-foreground/90 glow-text-sm">
                  {msg.text}
                </p>
              </div>
            )}

            {msg.role === "user" && (
              <div className="max-w-[75%] text-right bg-white/5 border border-white/10 p-4 rounded-sm backdrop-blur-sm">
                <p className="text-sm font-sans tracking-wide leading-relaxed text-foreground/80">
                  {msg.text}
                </p>
              </div>
            )}
          </motion.div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 w-full p-4 md:p-8 bg-gradient-to-t from-black via-black/90 to-transparent z-20">
        <div className="max-w-3xl mx-auto relative group/input">
          <form onSubmit={handleSend} className="relative flex items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Speak your truth..."
              className="w-full bg-transparent border-b border-white/20 focus:border-white/60 p-4 pr-12 text-sm text-foreground placeholder:text-white/20 resize-none min-h-[60px] max-h-[200px] font-sans focus:outline-none transition-colors"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
            />
            <button 
              type="submit" 
              disabled={!input.trim()}
              className="absolute right-2 bottom-4 p-2 text-white/40 hover:text-white transition-colors disabled:opacity-30 disabled:hover:text-white/40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="absolute -bottom-4 left-0 text-[10px] text-white/20 tracking-widest">
            SHIFT+ENTER for newline
          </div>
        </div>
      </div>
    </main>
  );
}
