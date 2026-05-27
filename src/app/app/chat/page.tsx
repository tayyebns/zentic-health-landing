"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useZenticStore } from "@/lib/store";
import { useTranslation } from "@/lib/useTranslation";
import type { ChatMessage } from "@/lib/types";

const CANNED_REPLIES = [
  "Thank you for sharing that. Try to log any new symptoms in your Daily Care journal — your GP will be able to see the full picture at your next appointment.",
  "I understand. If your symptoms feel urgent or get suddenly worse, please contact your GP surgery or call 111 straight away.",
  "That is a great question. While I am not able to give medical advice, keeping a record of how you feel is one of the best things you can do for your care.",
  "Managing a long-term condition takes real effort and you are doing well by staying on top of it. Your care team is here to support you.",
  "It is completely normal to have questions. I would encourage you to write them down before your next appointment so you can get the answers you need from your GP.",
  "I am always here to listen. Tracking how you feel — even on difficult days — helps build a clearer picture for everyone on your care team.",
];

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}
    >
      {!isUser && (
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5 self-end"
          style={{ backgroundColor: "#9485D4" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.6 2.8-1.6 3.8L20 16H4l5.6-6.2A4 4 0 0 1 8 6a4 4 0 0 1 4-4z" />
            <path d="M8 16v4M16 16v4" />
          </svg>
        </div>
      )}
      <div
        className="max-w-[78%] px-3.5 py-2.5 rounded-2xl"
        style={{
          backgroundColor: isUser ? "#9485D4" : "white",
          color: isUser ? "white" : "#1a1a2e",
          borderBottomRightRadius: isUser ? 4 : 16,
          borderBottomLeftRadius: isUser ? 16 : 4,
          boxShadow: isUser ? undefined : "0 1px 4px rgba(0,0,0,0.07)",
        }}
      >
        <p className="font-sans text-sm leading-relaxed">{message.text}</p>
      </div>
    </motion.div>
  );
}

export default function AIHealthCompanion() {
  const messages = useZenticStore((s) => s.chatMessages);
  const addChatMessage = useZenticStore((s) => s.addChatMessage);
  const t = useTranslation();

  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const replyIndexRef = useRef(0);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    addChatMessage({ id: `chat-user-${Date.now()}`, role: "user", text });
    setInput("");
    const replyText = CANNED_REPLIES[replyIndexRef.current % CANNED_REPLIES.length];
    replyIndexRef.current += 1;
    setTimeout(() => {
      addChatMessage({ id: `chat-assistant-${Date.now()}`, role: "assistant", text: replyText });
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex-shrink-0 px-4 pt-4 pb-3 border-b border-zentic-purple-light"
        style={{ backgroundColor: "#F3F1F8" }}
      >
        <h1 className="font-display text-xl font-semibold text-zentic-purple-dark">
          {t.chat.title}
        </h1>
        <p className="font-sans text-xs text-gray-400 mt-0.5">{t.chat.subtitle}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-2">
        <div className="flex justify-center mb-4">
          <span className="rounded-full px-3 py-1 font-sans text-[10px] text-gray-400 bg-white shadow-sm text-center">
            {t.chat.disclaimer}
          </span>
        </div>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex-shrink-0 px-4 py-3 border-t border-zentic-purple-light" style={{ backgroundColor: "white" }}>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.chat.placeholder}
            className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm font-sans text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-zentic-purple bg-zentic-bg"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
            style={{ backgroundColor: input.trim() ? "#9485D4" : "#E5E7EB" }}
          >
            <svg
              width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke={input.trim() ? "white" : "#9CA3AF"}
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
