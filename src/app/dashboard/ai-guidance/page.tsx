"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import {
  Bot,
  User,
  Send,
  Sparkles,
  Copy,
  Check,
  Trash2,
  AlertCircle,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const PRESET_PROMPTS = [
  "Help me choose a career.",
  "How do I become a Java Full Stack Developer?",
  "What skills should I learn for a software job?",
  "Create a career plan for me.",
];

function AIGuidanceChat() {
  const { user, userSkills } = useAuth();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      role: "assistant",
      content: `Hello **${user?.name || "Student"}**! 👋 I am your **SkillBridge AI Career Assistant**.

I can help you:
- Explore top tech career tracks based on your interests & degree
- Breakdown step-by-step roadmaps for roles like **Java Full Stack Developer**
- Recommend the exact skills and projects to learn next
- Answer questions about software engineering interviews & resumes

How can I empower your career journey today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [input, setInput] = useState(initialQuery || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialQuery && initialQuery.trim().length > 0) {
      sendMessage(initialQuery.trim());
    }
  }, [initialQuery]);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend || textToSend.trim().length === 0 || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: newHistory.map((m) => ({ role: m.role, content: m.content })),
          context: {
            userName: user?.name,
            educationLevel: user?.educationLevel,
            fieldOfStudy: user?.fieldOfStudy,
            targetCareer: user?.targetCareerTitle,
            currentSkills: userSkills.map((s) => s.name),
          },
        }),
      });

      const data = await res.json();

      if (data.success && data.message) {
        const assistantMsg: Message = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: data.message,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        setError(data.error || "Failed to receive response from AI backend.");
      }
    } catch (err) {
      console.error("Chat request failed:", err);
      setError("AI Service unavailable. Please verify your connection or click retry.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: `Chat history cleared. How else can I assist your career goals, **${user?.name}**?`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <div className="h-[calc(100vh-6.5rem)] flex flex-col max-w-5xl mx-auto rounded-2xl bg-navy-900/80 border border-purple-500/30 overflow-hidden shadow-2xl">
      {/* Studio Header */}
      <div className="p-4 sm:p-5 bg-navy-950/90 border-b border-purple-900/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-cyan-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">AI Career Assistant</h2>
              <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                Gemini AI Engine
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Target Career: <span className="text-slate-200 font-semibold">{user?.targetCareerTitle}</span>
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          title="Clear Conversation"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>

      {/* Suggested Prompt Pills Bar */}
      <div className="px-4 py-3 bg-navy-950/40 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-400" /> Suggestions:
        </span>
        {PRESET_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => sendMessage(prompt)}
            disabled={isLoading}
            className="text-xs px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:border-purple-500/50 transition-all shrink-0 font-medium"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Conversation Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? "ml-auto flex-row-reverse" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-bold text-xs ${
                  isUser
                    ? "bg-purple-600 text-white"
                    : "bg-gradient-to-tr from-purple-600 to-cyan-400 text-white shadow-md shadow-purple-500/20"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`space-y-1 group ${isUser ? "items-end" : "items-start"}`}>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? "bg-purple-600 text-white rounded-tr-none shadow-md shadow-purple-600/20"
                      : "bg-slate-900/90 border border-purple-500/20 text-slate-200 rounded-tl-none whitespace-pre-wrap"
                  }`}
                >
                  {msg.content}
                </div>

                <div className="flex items-center gap-2 px-1 text-[10px] text-slate-500">
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="hover:text-purple-300 transition-colors flex items-center gap-1"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>{copiedId === msg.id ? "Copied" : "Copy"}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 max-w-md">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400 text-white flex items-center justify-center font-bold text-xs">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-4 rounded-2xl rounded-tl-none bg-slate-900/90 border border-purple-500/20 text-xs text-purple-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Analyzing career requirements & generating advice...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => sendMessage("Help me choose a career.")}
              className="text-xs font-semibold px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200"
            >
              Retry
            </button>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Form Bar */}
      <div className="p-4 bg-navy-950/90 border-t border-purple-900/30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI anything about your career path, skills, or learning plan..."
            className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-500 font-semibold text-xs text-white shadow-lg shadow-purple-600/30 disabled:opacity-50 hover:opacity-95 transition-all flex items-center gap-2"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AIGuidancePage() {
  return (
    <Suspense
      fallback={
        <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
          Loading AI Career Studio...
        </div>
      }
    >
      <AIGuidanceChat />
    </Suspense>
  );
}
