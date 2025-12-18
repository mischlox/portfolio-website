// components/Views/ProjectsSection.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code, ChevronRight, Github } from 'lucide-react';
import { PROFILE } from '../Common/Data';

export const ProjectsSection: React.FC = () => {
  return (
    <div className="py-10">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Selected Work</h2>
          <p className="text-gray-500">Systems, pipelines, and experiments.</p>
        </div>
        <a href={PROFILE.social.github} className="hidden md:flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          View Github <Github size={14}/>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROFILE.projects.map((p, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-[#0F0F0F] border border-white/5 hover:border-white/10 p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 overflow-hidden"
          >
            {/* Hover Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                 <div className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner">
                    <Code size={24} />
                 </div>
                 <div className="text-gray-700 group-hover:text-white transition-colors">
                    <ArrowUpRight size={20} />
                 </div>
              </div>
              
              <div className="text-xs font-bold tracking-wider text-blue-500 mb-2 uppercase">{p.cat}</div>
              <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {p.desc}
              </p>
              
              <div className="flex items-center text-sm font-medium text-gray-600 group-hover:text-gray-300 transition-colors">
                Read Case Study <ChevronRight size={14} className="ml-1" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};