// components/Views/ContactSection.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { PROFILE } from '../Common/Data';
import { useContactForm } from '../../hooks/useContactForm'; 

// Reusable Social Button Component (FIXED: Must return JSX.Element)
const SocialBtn = ({ icon, href }: { icon: React.ReactNode, href: string }): JSX.Element => {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-4 bg-white text-black rounded-xl hover:bg-gray-200 transition-all shadow-lg shadow-white/10 hover:shadow-white/20 hover:-translate-y-0.5"
        >
            {icon}
        </a>
    );
};

export const ContactSection: React.FC = () => {
  // --- Use the custom hook to manage state and logic ---
  const { 
    formData, 
    status, 
    errorMsg,
    handleChange, 
    handleSubmit 
  } = useContactForm();
  // --------------------------------------------------

  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-40 text-center relative">
      
      <div 
        aria-hidden="true" 
        className="absolute inset-x-0 top-0 h-96 w-96 mx-auto bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"
      />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-xl"
      >
        <h2 className="text-5xl font-bold tracking-tight mb-6">Ready to Collaborate?</h2>
        <p className="text-gray-400 text-lg max-w-md mx-auto mb-10">
          I am actively seeking full-time Software Engineer roles focusing on Computer Vision, AI, and Embedded Systems (C++/Python). Please send me a message!
        </p>
        
        {/* Optional: Display detailed error message */}
        {status === 'error' && errorMsg && (
            <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-900/40 text-red-300 p-4 rounded-lg mb-4 text-sm text-left border border-red-700"
            >
                **Error Details:** {errorMsg}
            </motion.div>
        )}

        {/* --- CONTACT FORM --- */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-10 p-6 bg-[#0a0a0a] rounded-xl border border-white/10 shadow-xl">
          {/* Name Input with limit */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={100} // Added character limit
            className="w-full bg-[#050505] text-white px-5 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-blue-500 transition-colors"
          />
          {/* Email Input with limit */}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            maxLength={100} // Added character limit
            className="w-full bg-[#050505] text-white px-5 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-blue-500 transition-colors"
          />
          {/* Message Textarea with limits */}
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            minLength={10} // Added minimum length
            maxLength={2000} // Added character limit (e.g., 2000 characters)
            className="w-full bg-[#050505] text-white px-5 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-blue-500 transition-colors resize-none"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={status === 'loading'}
            className={`w-full font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg ${
              status === 'loading'
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-900/40'
            }`}
          >
            {status === 'loading' ? (
              // ... (Loading state SVG) ...
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : status === 'success' ? (
              <>Message Sent! 🎉</>
            ) : status === 'error' ? (
              <>Error! Try direct email. 😢</>
            ) : (
              <><Send size={20} /> Send Message</>
            )}
          </motion.button>
        </form>

        {/* --- Social Links --- */}
        <p className="text-gray-500 mb-4">or connect directly:</p>
        <div className="flex gap-4 justify-center">
          <a href={`mailto:${PROFILE.email}`} className="flex-1 bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/10 hover:shadow-white/20 hover:-translate-y-0.5 max-w-[200px]">
            <Mail size={20} /> Direct Email
          </a>
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

      </motion.div>
    </div>
  );
};