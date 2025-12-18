// components/Views/ContactSection.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { PROFILE } from '../Common/Data';
const SocialBtn = ({ icon, href }: { icon: React.ReactNode, href: string }) => {
    return (
      <a 
        href={href}
        target="_blank" 
        rel="noopener noreferrer" 
        className="h-14 w-14 bg-[#1a1a1a] border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#252525] hover:border-white/30 transition-all hover:-translate-y-0.5 shadow-lg"
      >
        {icon}
      </a>
    );
  };

export const ContactSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <h2 className="text-5xl font-bold tracking-tight mb-6">Ready to Collaborate?</h2>
        <p className="text-gray-400 text-lg max-w-md mx-auto mb-10">
        I am actively seeking full-time Software Engineer roles focusing on Computer Vision, AI, and Embedded Systems (C++/Python).
        
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
          <a href="mailto:mschlosser.se@gmail.com" className="flex-1 bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/10 hover:shadow-white/20 hover:-translate-y-0.5">
            <Mail size={20} /> Email Me
          </a>
          <div className="flex gap-4 justify-center">
          <SocialBtn 
              icon={<Linkedin size={22} />} 
              href={PROFILE.social.linkedin} 
            />
            {/* GitHub link using PROFILE data */}
            <SocialBtn 
              icon={<Github size={22} />} 
              href={PROFILE.social.github} 
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};