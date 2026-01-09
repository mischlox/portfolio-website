// components/Views/AboutSection.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Download, Eye, ArrowUpRight, ChevronDown } from 'lucide-react'; 
import ReactMarkdown from 'react-markdown';

import { PROFILE } from '../Common/Data';
interface TimelineItemProps {
  data: {
    year: string;
    logoPath?: string;
    title: string;
    subtitle: string;
    desc?: string;
    techStack?: string[];
    programUrl?: string;
  };
  isCareer?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ data, isCareer = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasDescription = !!data.desc; 

  const toggleDescription = () => {
    if (hasDescription) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="relative group">
      {/* Timeline Dot */}
      <span className="absolute -left-[37px] top-4 w-3 h-3 rounded-full bg-[#050505] border-2 border-gray-700 group-hover:border-blue-500 group-hover:scale-125 transition-all z-10"></span>

      {/* The Black Box Styling applied to the content */}
      <div 
        onClick={toggleDescription}
        className={`bg-black/20 p-6 rounded-2xl border border-white/5 transition-colors flex items-start gap-4 
        ${hasDescription ? 'cursor-pointer hover:border-white/20' : ''}`}
        tabIndex={hasDescription ? 0 : -1} 
        role={hasDescription ? "button" : undefined}
        onKeyDown={(e) => { 
          if (hasDescription && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            toggleDescription();
          }
        }}
      >

        {/* Logo */}
        {data.logoPath && (
          <div className="w-10 h-10 flex-shrink-0 mt-1">
            <Image
              src={data.logoPath}
              alt={data.subtitle + " logo"}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        )}

        <div className="flex-1">
          {/* Year & Link (Education specific) */}
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <div className="text-xs text-blue-400 font-medium bg-blue-500/10 inline-block px-2 py-1 rounded">
              {data.year}
            </div>

            {data.programUrl && ( // Education Link
              <a
                onClick={(e) => e.stopPropagation()} 
                href={data.programUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white font-medium bg-white/10 hover:bg-white/20 transition-colors inline-flex items-center gap-1 px-3 py-1 rounded-full"
              >
                More Info
                <ArrowUpRight size={12} className="ml-0.5" />
              </a>
            )}
          </div>

          {/* Title (Role/School) and Indicator Icon */}
          <div className="flex justify-between items-center mb-1">
            <div 
              className={`text-lg font-bold transition-colors ${hasDescription ? 'text-white group-hover:text-blue-400' : 'text-white'}`}
            >
              {data.title}
            </div>
            
            {/* Indicator Icon with text label */}
            {hasDescription && (
              <div 
                aria-expanded={isExpanded}
                className="text-blue-400 p-1 flex-shrink-0 flex items-center gap-1"
              >
                {/* Text label that changes based on state */}
                <span className="text-xs font-medium uppercase tracking-wider hidden sm:inline">
                  {isExpanded ? 'Hide Details' : 'View Details'}
                </span>
                
                {/* Chevron icon */}
                <ChevronDown size={20} className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`} />
              </div>
            )}
          </div>
          
          {/* Subtitle (Company/Degree) */}
          <div className="text-gray-400 mb-3">{data.subtitle}</div>

          {/* Tech Stack (Career specific) */}
          {isCareer && data.techStack && (
            <div className="flex flex-wrap gap-2 mb-3">
              {data.techStack.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-300 transition-all cursor-default hover:bg-white/10"
                  onClick={(e) => e.stopPropagation()} 
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* CORRECT DESCRIPTION (ReactMarkdown) */}
          {hasDescription && (
            <motion.div
              id={`description-${data.title.replace(/\s/g, '-')}`}
              initial={false}
              animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }} 
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="text-sm text-gray-300 leading-relaxed pt-2">
                <ReactMarkdown
                  components={{
                    // Apply Tailwind classes to rendered elements
                    p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                    strong: ({ node, ...props }) => <strong className="font-bold text-white" {...props} />,
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc list-inside space-y-1 pl-4 mb-4" {...props} />
                    ),
                    h1: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2 text-white" {...props} />,
                    h2: ({ node, ...props }) => <h4 className="text-base font-bold mt-3 mb-1 text-white" {...props} />,
                    h3: ({ node, ...props }) => <h5 className="text-sm font-bold mt-3 mb-1 text-white" {...props} />,
                   }}
                >
                  {data.desc || ''}
                </ReactMarkdown>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

// Define animation variant for staggered children (for continuity)
const itemVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-16 py-10">

      {/* STATIC "About Me" TITLE */}
      <h3 className="md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">About Me</h3>

      {/* Profile section */}
      <section className="space-y-6">
        <p className="text-white-400 text-lg leading-relaxed max-w-2xl border-l-2 border-blue-500 pl-6">
          {PROFILE.about}
        </p>
        <div className="flex gap-4">
          {/* View PDF Button */}
          <a
            href={PROFILE.social.resumePDF}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-black font-bold rounded-xl flex items-center gap-2 shadow-lg hover:bg-gray-400 transition-all"
          >
            <Eye size={20} /> View Resume
          </a>
          {/* Download PDF Button */}
          <a
            href={PROFILE.social.resumePDF}
            download
            className="px-6 py-3 bg-blue-800 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-blue-900/20 hover:bg-blue-500 transition-all"
          >
            <Download size={20} /> Download PDF
          </a>
        </div>
      </section>
      {/* --- Tech Stack Grid --- */}
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

      {/* Career History and Education sections container */}
      <motion.div variants={itemVariant} className="space-y-16">

        {/* Education Section */}
        <section>
          <h3 className="text-4xl font-medium text-white uppercase tracking-widest mb-6">Education</h3>
          <div className="space-y-6 border-l border-white/10 ml-2 pl-8">
            {PROFILE.education.map((edu, i) => (
              <TimelineItem
                key={i}
                data={{
                  year: edu.year,
                  logoPath: edu.logoPath,
                  title: edu.school,
                  subtitle: edu.degree,
                  desc: edu.desc,
                  programUrl: edu.programUrl,
                }}
              />
            ))}
          </div>
        </section>
        <section>
          <h3 className="text-4xl font-medium text-white uppercase tracking-widest mb-6">Career</h3>
          <div className="space-y-6 border-l border-white/10 ml-2 pl-8">
            {PROFILE.experience.map((job, i) => (
              <TimelineItem
                key={i}
                isCareer={true} // Set flag to render tech stack
                data={{
                  year: job.year,
                  logoPath: job.logoPath,
                  title: job.role,
                  subtitle: job.company,
                  desc: job.desc,
                  techStack: job.techStack,
                }}
              />
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
};