import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import {
  Send,
  User,
  RotateCcw,
  MessageSquare,
  CheckCheck,
  Sparkles,
  Bot,
  Trash2,
  Terminal,
  CornerDownLeft,
  Lightbulb
} from "lucide-react";

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "Ai",
    text: "I Am Ready To Help You",
    timestamp: "",
  }
];

export default function ChatBox() {
  const socketRef = useRef(null);
  // Messages state
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isThinking, setIsThinking] = useState(false);

  // Individual input states for User 1 and User 2
  const [user1Input, setUser1Input] = useState("");
  const [user2Input, setUser2Input] = useState("");

  // Auto-scroll ref
  const chatBottomRef = useRef(null);

  // Format current time helper (e.g. "10:32 AM")
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Manage socket connection lifecycle
  useEffect(() => {
    const socket = io("http://localhost:3000");
    socketRef.current = socket;

    // Listen for messages from backend
    socket.on("frontend", (data) => {
      const trimmed = typeof data === "string" ? data.trim() : JSON.stringify(data);
      if (!trimmed) return;
      const newMessage = {
        id: Date.now(),
        sender: "Ai",
        text: trimmed,
        timestamp: getCurrentTime(),
      };

      setIsThinking(false);
      setMessages((prev) => [...prev, newMessage]);
      setUser1Input("");
    });

    // Cleanup listener on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Handle User 1 send
  const handleUser1Send = (e) => {
    if (e) e.preventDefault();
  };

  // Handle User 2 send
  const handleUser2Send = (e) => {
    if (e) e.preventDefault();
    const trimmed = user2Input.trim();
    if (!trimmed) return;
    if (socketRef.current) {
      socketRef.current.emit("backend", trimmed); // Send message to backend for AI processing
    }
    setIsThinking(true);
    const newMessage = {
      id: Date.now(),
      sender: "User",
      text: trimmed,
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setUser2Input("");
  };

  // Reset conversation to initial state
  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setUser1Input("");
    setUser2Input("");
    setIsThinking(false);
  };

  // Clear all messages
  const handleClearAll = () => {
    setMessages([]);
    setUser1Input("");
    setUser2Input("");
    setIsThinking(false);
  };

  return (
    <div className="w-full flex-1 bg-slate-950 text-slate-100 flex flex-col items-center p-3 sm:p-6 md:p-8 font-sans selection:bg-indigo-500 selection:text-white relative">
      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 -right-20 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-5xl flex flex-col gap-5">
        
        {/* Main Card Header */}
        <header className="bg-slate-900/85 border border-slate-800 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 p-0.5 shadow-lg shadow-indigo-500/25 flex items-center justify-center text-white">
              <div className="w-full h-full bg-slate-950/20 rounded-[14px] flex items-center justify-center">
                <Bot className="w-6 h-6 text-indigo-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                  AI Assistant
                </h1>
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Real-time conversational intelligence for notes & questions
              </p>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/80 transition-all active:scale-95 cursor-pointer shadow-xs"
              title="Reset with sample message"
            >
              <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-800/80 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-slate-700/80 hover:border-rose-500/30 transition-all active:scale-95 cursor-pointer shadow-xs"
              title="Clear all messages"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </header>

        {/* Shared Chat Messages Window */}
        <div className="bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col overflow-hidden">
          
          {/* Chat Window Sub-header */}
          <div className="px-5 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20"></span>
                <span className="font-semibold text-slate-300">
                  AI Response
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-500 ring-4 ring-violet-500/20"></span>
                <span className="font-semibold text-slate-300">
                  You
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-medium">
                {messages.length} {messages.length === 1 ? "message" : "messages"}
              </span>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="h-[420px] sm:h-[480px] overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar bg-slate-950/50">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 gap-3">
                <div className="p-4 bg-slate-900/80 rounded-3xl border border-slate-800 text-slate-400">
                  <MessageSquare className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-200">
                  No messages yet
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
                  Send a prompt below to consult your AI assistant on your notes, ideas, or questions.
                </p>
              </div>
            ) : (
              messages.map((msg) => {
                const isAi = msg.sender === "Ai";

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col animate-bubble ${
                      isAi ? "items-start" : "items-end"
                    }`}
                  >
                    {/* Sender Label and Timestamp */}
                    <div
                      className={`flex items-center gap-2 mb-1.5 text-xs ${
                        isAi ? "flex-row" : "flex-row-reverse"
                      }`}
                    >
                      <span
                        className={`font-semibold px-2 py-0.5 rounded-md text-[11px] flex items-center gap-1.5 ${
                          isAi
                            ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
                            : "bg-violet-500/15 text-violet-300 border border-violet-500/30"
                        }`}
                      >
                        {isAi ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                        {msg.sender}
                      </span>
                      {msg.timestamp && (
                        <span className="text-[10px] text-slate-500">
                          {msg.timestamp}
                        </span>
                      )}
                    </div>

                    {/* Chat Bubble */}
                    <div className="flex items-end gap-2.5 max-w-[90%] sm:max-w-[80%]">
                      {isAi && (
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 p-0.5 shadow-md shadow-indigo-500/20 shrink-0 hidden sm:flex items-center justify-center">
                          <div className="w-full h-full bg-slate-950/20 rounded-[10px] flex items-center justify-center">
                            <Bot className="w-4 h-4 text-indigo-200" />
                          </div>
                        </div>
                      )}

                      <div
                        className={`p-4 sm:px-5 sm:py-3.5 rounded-3xl shadow-xl transition-all break-words text-sm sm:text-base leading-relaxed ${
                          isAi
                            ? "bg-slate-900 border border-indigo-500/20 text-slate-100 rounded-tl-xs shadow-indigo-500/5 hover:border-indigo-500/30"
                            : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-tr-xs shadow-indigo-500/20"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                        <div
                          className={`mt-1.5 flex items-center gap-1 text-[10px] opacity-75 ${
                            isAi ? "justify-start text-slate-400" : "justify-end text-indigo-100"
                          }`}
                        >
                          <CheckCheck className="w-3 h-3 inline-block" />
                          <span>Delivered</span>
                        </div>
                      </div>

                      {!isAi && (
                        <div className="w-8 h-8 rounded-xl bg-violet-600/30 border border-violet-500/40 text-violet-300 hidden sm:flex items-center justify-center shrink-0 text-xs font-bold shadow-md shadow-violet-600/20">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}

            {/* AI Thinking Animation */}
            {isThinking && (
              <div className="flex flex-col animate-bubble items-start">
                <div className="flex items-center gap-2 mb-1.5 text-xs flex-row">
                  <span className="font-semibold px-2 py-0.5 rounded-md text-[11px] flex items-center gap-1.5 bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    <Bot className="w-3 h-3" />
                    Ai
                  </span>
                </div>

                <div className="flex items-end gap-2.5 max-w-[85%]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 p-0.5 shrink-0 hidden sm:flex items-center justify-center">
                    <div className="w-full h-full bg-slate-950/20 rounded-[10px] flex items-center justify-center">
                      <Bot className="w-4 h-4 text-indigo-200" />
                    </div>
                  </div>

                  <div className="px-5 py-3.5 rounded-3xl bg-slate-900 border border-indigo-500/30 text-slate-200 rounded-tl-xs shadow-lg flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"></span>
                      <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce [animation-delay:0.15s]"></span>
                      <span className="w-2 h-2 rounded-full bg-indigo-300 animate-bounce [animation-delay:0.3s]"></span>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-indigo-300">
                      AI is generating response...
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>
        </div>

        {/* Input Section - Fully Responsive & Centered */}
        <div className="w-full bg-slate-900/85 border border-slate-800 backdrop-blur-xl rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col gap-3">
          
          {/* Quick Suggestion Pills */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Prompt suggestions:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  setUser2Input("You Are Ready To GIve MY Answer. 👍")
                }
                className="text-xs px-3 py-1 bg-slate-800/80 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 rounded-xl border border-slate-700/80 hover:border-indigo-500/30 transition-all cursor-pointer active:scale-95"
              >
                "You Are Ready To Give Answer 👍"
              </button>
              <button
                type="button"
                onClick={() =>
                  setUser2Input("Everything is completed and looks great! ✨")
                }
                className="text-xs px-3 py-1 bg-slate-800/80 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 rounded-xl border border-slate-700/80 hover:border-indigo-500/30 transition-all cursor-pointer active:scale-95"
              >
                "Looks great! ✨"
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleUser2Send} className="w-full">
            <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 rounded-2xl p-1.5 transition">
              <input
                type="text"
                value={user2Input}
                onChange={(e) => setUser2Input(e.target.value)}
                placeholder="Ask AI anything about your notes or tasks..."
                className="flex-1 bg-transparent px-3 py-2 text-sm sm:text-base text-slate-100 placeholder-slate-500 outline-none"
              />
              <button
                type="submit"
                disabled={!user2Input.trim()}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-40 disabled:hover:from-indigo-600 disabled:hover:to-violet-600 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-1.5 transition active:scale-95 disabled:active:scale-100 cursor-pointer disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </form>

          {/* Footer note */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
            <span>Powered by your real-time AI socket connection</span>
            <span className="hidden sm:inline">Press Enter to send</span>
          </div>
        </div>

      </div>
    </div>
  );
}
