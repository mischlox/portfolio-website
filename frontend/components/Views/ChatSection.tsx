// components/Views/ChatSection.tsx

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Github } from 'lucide-react';
import Image from 'next/image';
import { PROFILE } from '../Common/Data';
import { RotatingText } from './RotatingText';
import { useChatBot } from '../../hooks/useChatBot'; 

interface ChatSectionProps {
    onAction: (action: string) => void;
}

export const ChatSection: React.FC<ChatSectionProps> = ({ onAction }) => {
  const { 
    messages, 
    input, 
    isTyping, 
    setInput, 
    handleSend 
  } = useChatBot(onAction);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);
  
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(e);
  };

  return (
    <div className="flex flex-col min-h-full justify-start items-center px-4 sm:px-0 pb-12 overflow-y-auto"> 
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center" 
      >
        <div className="mb-4 relative">
          <Image
            src="/profile-picture.jpg"
            alt={PROFILE.full_name}
            width={160}
            height={160}
            className="rounded-full mx-auto shadow-lg w-32 h-32 md:w-48 md:h-48 object-cover"
          />
        </div>
        <h1 className="text-xl md:text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
          Hey, I'm {PROFILE.first_name}
        </h1>
        <RotatingText 
          words={[
            "Software Engineer",
            "C++ & Python Specialist",
            "Computer Vision Practitioner",
            "Embedded Developer",
            "Agentic AI Enthusiast"
          ]}
          // MODIFIED: ONLY pass the text styling (gradient/clipping) classes here.
          // The size/weight/margin/min-height will be handled internally by RotatingText.
          className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
        />
        <div className="flex flex-wrap justify-center gap-2 mb-2 max-w-3xl mx-auto mt-10">
          {["Computer Vision", "Deep Learning", "Embedded Systems", "C++", "Python", "Agentic AI"].map((label) => (
            <div 
              key={label}
              className="px-3 py-1 text-[10px] md:text-xs font-medium text-blue-300 bg-white/10 border border-white/10 rounded-full transition-all hover:scale-[1.02] hover:bg-white/10 cursor-default"            >
              {label}
            </div>
          ))}
        </div>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-base md:text-xl font-medium text-gray-400 mb-4 flex items-center gap-2 text-center"
      >
        <Sparkles size={16} className="text-blue-400 md:w-5 md:h-5" /> 
        Ask my AI Assistant anything about my career
      </motion.p>

      <motion.div 
        layout
        className="w-full max-w-3xl bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl md:rounded-4xl overflow-hidden shadow-2xl flex flex-col h-[380px] md:h-[450px] relative ring-1 ring-white/5" 
      >
        <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
          
          <div className="ml-auto text-xs font-mono text-green-400 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Online
          </div>
        </div>

        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 scrollbar-thin scrollbar-thumb-gray-800"
        >
          {messages.map((m, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] px-4 py-3 md:px-5 md:py-3.5 whitespace-pre-line rounded-2xl text-xs md:text-sm leading-relaxed shadow-lg backdrop-blur-sm ${
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
        </div>

        <div className="p-3 md:p-4 bg-black/20 border-t border-white/10 backdrop-blur-lg">
          <form onSubmit={onSubmit} className="relative flex items-center gap-2 md:gap-3">
            <div className="absolute left-4 text-blue-500">
              <Sparkles size={18} />
            </div>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="w-full bg-[#0a0a0a] text-white pl-10 md:pl-11 pr-12 py-3 md:py-4 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-600 text-sm font-medium shadow-inner"
              autoFocus
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="absolute right-2 md:right-3 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all disabled:opacity-0 disabled:scale-75 shadow-lg shadow-blue-900/20"
            >
              <ArrowUpRight size={18} />
            </button>
          </form>
          <div className="flex gap-2 mt-3 justify-start md:justify-center overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {["Experience", "Tech Stack", "Contact"].map((chip) => (
              <button
                key={chip}
                onClick={() => setInput(`Tell me about your ${chip}`)}
                className="px-3 py-1 text-[10px] md:text-xs font-medium text-gray-500 bg-white/5 border border-white/5 rounded-full hover:bg-white/10 hover:text-white hover:border-white/20 transition-all whitespace-nowrap flex-shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.a
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        href="https://github.com/mischlox/portfolio-website/tree/master/backend"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-medium text-gray-100 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white transition-all shadow-md text-center"
      >
        <Github size={16} />
        Check out the code for this assistant on GitHub
        <ArrowUpRight size={14} />
      </motion.a>

    </div>
  );
};