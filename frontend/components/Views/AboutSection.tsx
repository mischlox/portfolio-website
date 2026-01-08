// components/Views/AboutSection.tsx

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'; // Ensure Image is imported
import { Download, Eye, ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../Common/Data';

// --- Define animation variant for staggered children (for continuity) ---
const itemVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
// --------------------------------------------------------------------------

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-16 py-10">
      
      {/* ------------------------------------- */}
      {/* STATIC "About Me" TITLE (as requested) */}
      <h3 className="md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">About Me</h3>
      {/* ------------------------------------- */}

      {/* --- Profile section (RESTORED) --- */}
      <section className="space-y-6">
        
        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl border-l-2 border-blue-500 pl-6">
          {PROFILE.about}
        </p>
        <div className="flex gap-4">
            {/* View PDF Button (Opens in new tab) */}
            <a 
              href={PROFILE.social.resumePDF} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-black font-bold rounded-xl flex items-center gap-2 shadow-lg hover:bg-gray-200 transition-all"
            >
              <Eye size={20} /> View Resume
            </a>
            {/* Download PDF Button */}
            <a 
              href={PROFILE.social.resumePDF} 
              download 
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-blue-900/20 hover:bg-blue-500 transition-all"
            >
              <Download size={20} /> Download PDF
            </a>
        </div>
      </section>
      {/* ------------------------------------- */}

      {/* --- Tech Stack Grid (RESTORED) --- */}
      <section>
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-6">Technical Arsenal</h3>
        
        {/* Responsive Grid Container for Skill Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6"> 
          {Object.entries(PROFILE.skills).map(([category, skills]) => (
            <div key={category} className="h-full flex flex-col">
              
              {/* Category Title */}
              <h4 className="text-sm font-semibold text-white mb-4 pb-2 border-b border-white/10">{category}</h4>
              
              {/* Flex container for the labels, allowing wrap if necessary */}
              <div className="flex flex-wrap gap-2"> 
                {skills.map((s, i) => (
                  <motion.div 
                    key={s}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-300 transition-all cursor-default hover:bg-white/10"
                  >
                    {s}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ------------------------------------- */}

      {/* Career History and Education sections container */}
      <motion.div variants={itemVariant} className="space-y-16"> 
        
        {/* --- Education Section --- */}
        <section>
          <h3 className="text-4xl font-medium text-gray-500 uppercase tracking-widest mb-6">Education</h3>
          <div className="space-y-4">
            {PROFILE.education.map((edu, i) => (
              <div key={i} className="bg-[#0F0F0F] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors flex items-start gap-4">
                
                {/* Logo for Education */}
                {edu.logoPath && (
                  <div className="w-10 h-10 flex-shrink-0 mt-1">
                    <Image 
                      src={edu.logoPath} 
                      alt={edu.school + " logo"} 
                      width={40} 
                      height={40}
                      className="object-contain"
                    />
                  </div>
                )}
                
                <div className="flex-1"> {/* Use flex-1 to push content to the side */}
                  <div className="text-lg font-bold text-white">{edu.school}</div>
                  <div className="text-gray-400 text-sm mb-4">{edu.degree}</div>
                  
                  {/* Container for Year and Link */}
                  <div className="flex flex-wrap items-center gap-4"> 
                    <div className="text-xs text-blue-400 font-medium bg-blue-500/10 inline-block px-2 py-1 rounded">
                      {edu.year}
                    </div>
                    
                    {/* NEW: Click for More Info Link */}
                    {edu.programUrl && (
                        <a 
                            href={edu.programUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-xs text-white font-medium bg-white/10 hover:bg-white/20 transition-colors inline-flex items-center gap-1 px-3 py-1 rounded-full"
                        >
                            More Info 
                            <ArrowUpRight size={12} className="ml-0.5"/>
                        </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Career History --- */}
        <section>
          <h3 className="text-4xl font-medium text-gray-500 uppercase tracking-widest mb-6">Career History</h3>
          <div className="space-y-8 border-l border-white/10 ml-2 pl-8">
            {PROFILE.experience.map((job, i) => (
              <div key={i} className="relative group">
                {/* Timeline Dot */}
                <span className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-[#050505] border-2 border-gray-700 group-hover:border-blue-500 group-hover:scale-125 transition-all"></span>
                
                <div className="text-sm text-gray-500 font-medium mb-1">{job.year}</div>
                
                {/* Container for Role and optional Logo */}
                <div className="flex items-center gap-3">
                  <div className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{job.role}</div>
                  {job.logoPath && (
                    <div className="w-6 h-6 flex-shrink-0 opacity-70">
                      <Image
                        src={job.logoPath}
                        alt={job.company + " logo"}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
                
                <div className="text-gray-400 mb-2">{job.company}</div>
                <p className="text-sm text-gray-500 leading-relaxed">{job.desc}</p>
              </div>
            ))}
          </div>
        </section>
        
      </motion.div>
    </div>
  );
};