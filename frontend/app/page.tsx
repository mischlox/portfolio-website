// app/page.tsx

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { View, PROFILE } from '@/components/Common/Data';
import { ChevronDown, Check } from 'lucide-react'; // Import Check icon for notification

// Import Layout Components
import { Navigation } from '@/components/Layout/Navigation';

// Import View Components
import { ChatSection } from '@/components/Views/ChatSection';
import { AboutSection } from '@/components/Views/AboutSection';
import { ProjectsSection } from '@/components/Views/ProjectsSection';
import { ContactSection } from '@/components/Views/ContactSection';


// --- ANIMATED SCROLL DOWN TEXT COMPONENT (FIXED POSITIONING) ---
const AnimatedScrollArrow: React.FC<{ targetRef: React.RefObject<HTMLDivElement>; active: boolean }> = ({ targetRef, active }) => {
  
  // FIX: Define a constant for the fixed header height (roughly matching the pt-32 on <main>)
  const HEADER_HEIGHT = 128; // Tailwind pt-32 is 8rem = 128px

  const handleClick = () => {
    if (targetRef.current) {
      // Calculate the scroll position: 
      // Current top position of the target element + current scroll position - header height
      const targetTop = targetRef.current.getBoundingClientRect().top + window.scrollY;
      const scrollPosition = targetTop - HEADER_HEIGHT;
      
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: [0, 10, 0] }} // Subtle bounce animation
          exit={{ opacity: 0, y: 20 }}
          transition={{ 
            y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.3 }
          }}
          onClick={handleClick}
          className="fixed bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 cursor-pointer text-sm font-semibold text-gray-400 hover:text-white transition-colors z-[60] flex flex-col items-center"
        >
          Scroll down
          <ChevronDown size={20} className="mt-1" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
// -----------------------------------------------------------

// --- NEW: Temporary Notification Component (POSITION MODIFIED) ---
const Notification: React.FC<{ message: string }> = ({ message }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }} // Initial position is up
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }} // Exit position is up
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            // --- MODIFIED POSITIONING CLASSES ---
            // top-5 left-1/2 -translate-x-1/2 centers it at the top
            className="fixed top-5 left-1/2 -translate-x-1/2 p-4 bg-green-600 text-white rounded-xl shadow-2xl z-[70] flex items-center gap-2 font-semibold"
        >
            <Check size={20} />
            {message}
        </motion.div>
    );
};
// ---------------------------------------------


// Define a mapping for the refs
const viewRefs = {
  chat: 'chat',
  about: 'about',
  projects: 'projects',
  contact: 'contact',
} as const;

// --- NEW: Action mapping for the chat bot command ---
const ACTION_MAP: Record<string, View> = {
    'SCROLL_TO_CONTACT': 'contact',
};
// ----------------------------------------------------


export default function Portfolio() {
  const [activeView, setActiveView] = useState<View>('chat');
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); 
  
  // --- NEW STATE for Notification ---
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
  // ------------------------------------

  // --- Refs for each section ---
  const chatRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const sectionRefs: Record<View, React.RefObject<HTMLDivElement>> = {
    chat: chatRef,
    about: aboutRef,
    projects: projectsRef,
    contact: contactRef,
  };
  // ----------------------------------

  // --- FIX: Scroll to top on mount to counteract unwanted initial scrolling ---
  useEffect(() => {
    // Check if running client-side before trying to access window
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []); // Run only once on mount
  // -------------------------------------------------------------------------


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
  
  // --- IntersectionObserver Logic (Using corrected rootMargin) ---
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null, // viewport
      // Using -50px margin from the top to detect when a new section passes the navigation bar
      rootMargin: '-50px 0px 0px 0px', 
      threshold: 0.1, 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveView(entry.target.id as View); 
        }
      });
    }, observerOptions);

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [sectionRefs]);


  // Update setActiveView to scroll to the section instead of switching
  const handleSetActiveView = useCallback((view: View) => {
    // FIX: Using the same offset logic as the scroll arrow for consistent scrolling
    const targetElement = sectionRefs[view].current;
    const HEADER_HEIGHT = 128; 

    if (targetElement) {
      const targetTop = targetElement.getBoundingClientRect().top + window.scrollY;
      const scrollPosition = targetTop - HEADER_HEIGHT;
      
      window.scrollTo({
        top: scrollPosition,
        // The scrolling speed is controlled by the browser's default 'smooth' behavior
        behavior: 'smooth' 
      });
      
      // --- NEW: Trigger Notification after scrolling completes (approx 700ms) ---
      // NOTE: There is no native promise for scroll-to-end. We use a short delay.
      if (view === 'contact') {
          setTimeout(() => {
              setNotificationMessage("Here you go! Contact form is ready.");
              // Clear the notification after a few seconds
              setTimeout(() => setNotificationMessage(null), 3000); 
          }, 700); // Wait for the scroll to finish
      }
      // -------------------------------------------------------------------------
    }

  }, [sectionRefs]);
  
  // --- NEW: Action Handler for Chat Bot ---
  const handleChatAction = useCallback((action: string) => {
      const targetView = ACTION_MAP[action];
      if (targetView) {
          handleSetActiveView(targetView);
      }
  }, [handleSetActiveView]);
  // ------------------------------------------

  const sectionVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        staggerChildren: 0.1
      } 
    },
  };

  return (
    <div 
      className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30 relative overflow-x-hidden"
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
        setActiveView={handleSetActiveView}
      />

      {/* --- SCROLL ARROW (Fixed Positioned) --- */}
      <AnimatedScrollArrow 
        targetRef={aboutRef} 
        active={activeView === 'chat'} 
      />

      <main className="pt-16 pb-20 px-6 max-w-4xl mx-auto flex flex-col relative z-10"> 
        
        {/* Chat Section */}
        <section 
          ref={chatRef} 
          id="chat" 
          className="min-h-screen pt-10 relative"
        >
          {/* PASS THE ACTION HANDLER */}
          <ChatSection onAction={handleChatAction} /> 
        </section>

        {/* Apply scroll animation to the subsequent sections */}
        <motion.section 
          ref={aboutRef} 
          id="about" 
          className="min-h-screen pt-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <AboutSection />
        </motion.section>

        <motion.section 
          ref={projectsRef} 
          id="projects" 
          className="min-h-screen pt-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <ProjectsSection />
        </motion.section>

        <motion.section 
          ref={contactRef} 
          id="contact" 
          className="min-h-screen pt-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <ContactSection />
        </motion.section>

      </main>

      {/* --- NEW: Notification Display (Now fixed to the top) --- */}
      <AnimatePresence>
        {notificationMessage && <Notification message={notificationMessage} />}
      </AnimatePresence>
      {/* ----------------------------------- */}

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-gray-600 border-t border-white/5 relative z-10">
        <p>© {new Date().getFullYear()}  {PROFILE.full_name} • All rights reserved.</p>
      </footer>
    </div>
  );
}