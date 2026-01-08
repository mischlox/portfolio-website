import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Code, Github, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import Image from 'next/image';
import { PROFILE } from '../Common/Data';

// Animation variants for the slide effect
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
  })
};

const AUTO_SCROLL_DELAY = 6000; // 6 seconds for slow auto-scroll

export const ProjectsSection: React.FC = () => {
  // state: [current page index, direction of movement]
  const [[page, direction], setPage] = useState([0, 0]);
  const projects = PROFILE.projects;

  // Calculate current index with wrapping (infinite loop)
  const projectIndex = ((page % projects.length) + projects.length) % projects.length;
  const currentProject = projects[projectIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  
  // Auto-scrolling useEffect
  useEffect(() => {
    const timer = setInterval(() => {
      // Auto-scroll forward (direction 1)
      paginate(1); 
    }, AUTO_SCROLL_DELAY);

    // Cleanup interval on component unmount or when dependencies change
    return () => clearInterval(timer);
  }, [page, projects.length]);

  return (
    <div className="py-10 flex flex-col h-full justify-center">
      
      {/* Header (Simplified - Navigation buttons removed from here) */}
      <div className="flex justify-between items-end mb-8 md:mb-12">
        <div>
          <h3 className="md:text-6xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            My Project Portfolio
          </h3>
          <p className="text-gray-400 text-sm md:text-base">
            Project {projectIndex + 1} of {projects.length}
          </p>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative h-[600px] w-full overflow-hidden rounded-3xl bg-[#0F0F0F] border border-white/5 shadow-2xl group">
        
        {/* --- ADDED: Absolute Navigation Buttons (Left/Right) --- */}
        <div className="absolute inset-0 z-20 flex items-center justify-between pointer-events-none">
          {/* Left Button */}
          <button 
            onClick={() => paginate(-1)}
            className="p-4 ml-4 rounded-full bg-black/50 border border-white/10 text-white/80 hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 pointer-events-auto shadow-xl"
            aria-label="Previous project"
          >
            <ChevronLeft size={24} />
          </button>
          
          {/* Right Button */}
          <button 
            onClick={() => paginate(1)}
            className="p-4 mr-4 rounded-full bg-black/50 border border-white/10 text-white/80 hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 pointer-events-auto shadow-xl"
            aria-label="Next project"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        {/* -------------------------------------------------------- */}
        
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 flex flex-col md:flex-row"
          >
            
            {/* --- LEFT: Image / Placeholder --- */}
            <div className="w-full md:w-1/2 h-64 md:h-full relative bg-black/20 border-b md:border-b-0 md:border-r border-white/5 overflow-hidden group">
              {currentProject.imagePath ? (
                 <div className="relative w-full h-full">
                   <Image 
                     src={currentProject.imagePath} 
                     alt={currentProject.title}
                     fill
                     className="object-cover transition-transform duration-700 group-hover:scale-105"
                   />
                   {/* Overlay Gradient */}
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent md:hidden" />
                 </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 bg-gradient-to-br from-gray-900 to-black">
                  <div className="p-4 rounded-2xl bg-white/5 mb-4">
                     <Layers size={48} className="opacity-50" />
                  </div>
                  <span className="text-sm font-medium tracking-widest uppercase opacity-50">Image Preview Unavailable</span>
                </div>
              )}
            </div>

            {/* --- RIGHT: Content --- */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
              
              {/* Category Tag */}
              <div className="flex items-center gap-2 mb-4">
                 <span className="h-px w-8 bg-blue-500"></span>
                 <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
                    {currentProject.cat}
                 </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {currentProject.title}
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
                {currentProject.desc}
              </p>

              {/* Tech Stack Labels */}
              <div className="mb-8">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProject.techStack?.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1.5 text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Github Button */}
              <div className="mt-auto pt-6 border-t border-white/5">
                {currentProject.url ? (
                  <a 
                    href={currentProject.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all group w-fit shadow-lg shadow-blue-900/20"
                  >
                    <Github size={20} />
                    <span>View Project on GitHub</span>
                    <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
                  </a>
                ) : (
                   <div className="inline-flex items-center gap-2 text-gray-500 text-sm cursor-not-allowed px-4 py-2 border border-white/5 rounded-xl">
                      <Code size={16} /> Source Code Unavailable
                   </div>
                )}
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Navigation Indicators (Dots) */}
      <div className="flex justify-center gap-2 mt-6">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > projectIndex ? 1 : -1])} // Allows clicking dots to jump
            className={`w-2 h-2 rounded-full transition-all ${i === projectIndex ? 'bg-blue-500 w-4' : 'bg-gray-600 hover:bg-gray-400'}`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};