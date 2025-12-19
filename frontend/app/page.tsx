// app/page.tsx

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { View, PROFILE } from '@/components/Common/Data';

// Import Layout Components
import { Navigation } from '@/components/Layout/Navigation';

// Import View Components
import { ChatSection } from '@/components/Views/ChatSection';
import { AboutSection } from '@/components/Views/AboutSection';
import { ProjectsSection } from '@/components/Views/ProjectsSection';
import { ContactSection } from '@/components/Views/ContactSection';


export default function Portfolio() {
  const [activeView, setActiveView] = useState<View>('chat');
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); 

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Mouse Move for Spotlight Effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div 
      className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30 relative overflow-hidden"
      onMouseMove={handleMouseMove} 
    >
      <div 
        className="animated-gradient-bg absolute inset-0 z-0 opacity-20" 
      />
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(65, 105, 225, 0.10), transparent 40%)`
        }}
      />

      {/* --- NAVIGATION --- */}
      <Navigation 
        scrolled={scrolled} 
        activeView={activeView} 
        setActiveView={setActiveView} 
      />

      {/* --- MAIN CONTENT WITH ANIMATED TRANSITIONS --- */}
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen flex flex-col relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex-1"
          >
            {activeView === 'chat' && <ChatSection />}
            {activeView === 'about' && <AboutSection />}
            {activeView === 'projects' && <ProjectsSection />}
            {activeView === 'contact' && <ContactSection />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-gray-600 border-t border-white/5 relative z-10">
        <p>© {new Date().getFullYear()}  {PROFILE.full_name} • All rights reserved.</p>
      </footer>
    </div>
  );
}