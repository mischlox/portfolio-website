// components/Views/ChatSection.tsx

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Terminal } from 'lucide-react';
import Image from 'next/image';
import { PROFILE } from '../Common/Data';

// --- IMPORT THE NEW CUSTOM HOOK AND TYPES ---
import { useChatBot, Message } from '../../hooks/useChatBot'; 
// ----------------------------------------------

export const ChatSection: React.FC = () => {
  // --- USE THE HOOK TO GET ALL STATE AND HANDLERS ---
  const { 
    messages, 
    input, 
    isTyping, 
    setInput, 
    handleSend 
  } = useChatBot();
  // --------------------------------------------------

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // handleSend logic has been removed and is now inside useChatBot

  return (
    <div className="flex flex-col h-[75vh] justify-center items-center">
      
      {/* Header Intro */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-8"
      >
        <div className="mb-4">
          <Image
            src="/profile-picture.jpg"
            alt={PROFILE.full_name}
            width={300}
            height={300}
            className="rounded-full mx-auto border-4 shadow-lg"
          />
        </div>
        <h1 className="text-2xl md:text tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
          Hey, I'm {PROFILE.first_name}
        </h1>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
          {PROFILE.role}
        </h1>
        <div className="flex items-center justify-center gap-2 text-sm text-green-400 font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Neural Interface Active
        </div>
      </motion.div>

      {/* --- THE CHAT WINDOW --- */}
      <motion.div 
        layout
        className="w-full max-w-3xl bg-black/40 backdrop-blur-md border border-white/10 rounded-4xl overflow-hidden shadow-2xl flex flex-col h-[500px] relative ring-1 ring-white/5"
      >
        {/* Decorative Top Bar */}
        <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
          <div className="ml-auto text-xs font-mono text-gray-500 flex items-center gap-1">
            <Terminal size={10} /> Portfolio Assistant
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-800">
          {messages.map((m, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] px-5 py-3.5 whitespace-pre-line rounded-2xl text-[15px] leading-relaxed shadow-lg backdrop-blur-sm ${
                m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-sm' 
                  : 'bg-[#1a1a1a]/80 text-gray-100 border border-white/10 rounded-bl-sm'
              }`}>
                {m.text}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
               <div className="bg-[#1a1a1a] px-4 py-4 rounded-2xl rounded-bl-none border border-white/5 flex gap-1.5 items-center h-10">
                 <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                 <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                 <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
               </div>
             </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/20 border-t border-white/10 backdrop-blur-lg">
          <form onSubmit={handleSend} className="relative flex items-center gap-3">
            <div className="absolute left-4 text-blue-500">
              <Sparkles size={18} />
            </div>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about my experience..."
              className="w-full bg-[#0a0a0a] text-white pl-11 pr-12 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-600 text-sm font-medium shadow-inner"
              autoFocus
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="absolute right-3 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all disabled:opacity-0 disabled:scale-75 shadow-lg shadow-blue-900/20"
            >
              <ArrowUpRight size={20} />
            </button>
          </form>
          {/* Quick Chips */}
          <div className="flex gap-2 mt-3 justify-center overflow-x-auto no-scrollbar">
            {["Experience", "Tech Stack", "Contact"].map((chip) => (
              <button
                key={chip}
                onClick={() => setInput(`Tell me about your ${chip}`)}
                className="px-3 py-1 text-xs font-medium text-gray-500 bg-white/5 border border-white/5 rounded-full hover:bg-white/10 hover:text-white hover:border-white/20 transition-all whitespace-nowrap"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};