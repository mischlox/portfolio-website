// components/Views/AboutSection.tsx

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Download, Eye } from 'lucide-react';
import { PROFILE } from '../Common/Data';

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-16 py-10">
      
      <section className="space-y-6">
        <div className="mb-8">
            <Image
                src="/profile-picture.jpg"
                alt={PROFILE.full_name}
                width={180} // Slightly larger for the dedicated profile section
                height={180}
                className="rounded-3xl border-2 border-white/10 shadow-xl"
            />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
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

      {/* Tech Stack Grid */}
      <section>
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-6">Technical Arsenal</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PROFILE.skills.map((s, i) => (
            <motion.div 
              key={s}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="px-4 py-3 bg-[#0F0F0F] border border-white/5 rounded-xl text-sm text-gray-300 flex items-center justify-center hover:bg-white/5 hover:border-white/10 transition-all cursor-default hover:scale-105"
            >
              {s}
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-12">
        <section>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-6">Career History</h3>
          <div className="space-y-8 border-l border-white/10 ml-2 pl-8">
            {PROFILE.experience.map((job, i) => (
              <div key={i} className="relative group">
                <span className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-[#050505] border-2 border-gray-700 group-hover:border-blue-500 group-hover:scale-125 transition-all"></span>
                <div className="text-sm text-gray-500 font-mono mb-1">{job.year}</div>
                <div className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{job.role}</div>
                <div className="text-gray-400 mb-2">{job.company}</div>
                <p className="text-sm text-gray-500 leading-relaxed">{job.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-6">Education</h3>
          <div className="space-y-4">
            {PROFILE.education.map((edu, i) => (
              <div key={i} className="bg-[#0F0F0F] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="text-lg font-bold text-white">{edu.school}</div>
                <div className="text-gray-400 text-sm mb-4">{edu.degree}</div>
                <div className="text-xs text-blue-400 font-mono bg-blue-500/10 inline-block px-2 py-1 rounded">
                  {edu.year}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};