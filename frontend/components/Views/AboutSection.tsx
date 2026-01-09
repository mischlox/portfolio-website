// components/Views/AboutSection.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Download, Eye, ArrowUpRight, ChevronDown, SquareCode, Brain, Cpu, Wrench } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import { PROFILE } from '../Common/Data';

const IconMap: Record<string, React.FC<any>> = {
  SquareCode,
  Brain,
  Cpu,
  Wrench,
};

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
  const [isHovered, setIsHovered] = useState(false);
  const hasDescription = !!data.desc;
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (!hasDescription) return;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(false);
  };

  const toggleDescription = () => {
    if (hasDescription) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      setIsExpanded(!isExpanded);
      setIsHovered(false);
    }
  };

  const currentExpandedState = hasDescription && (isExpanded || isHovered);

  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative group">
      <span className="absolute -left-[29px] md:-left-[37px] top-4 w-3 h-3 rounded-full bg-[#050505] border-2 border-gray-700 group-hover:border-blue-500 group-hover:scale-125 transition-all z-10"></span>

      <div
        onClick={toggleDescription}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`bg-black/20 p-4 sm:p-6 rounded-2xl border border-white/5 transition-colors flex items-start gap-3 sm:gap-4
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

        {data.logoPath && (
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 mt-1">
            <Image
              src={data.logoPath}
              alt={data.subtitle + " logo"}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
            <div className="text-xs text-blue-400 font-medium bg-blue-500/10 inline-block px-2 py-1 rounded">
              {data.year}
            </div>

            {data.programUrl && (
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

          <div className="flex justify-between items-start sm:items-center mb-1 gap-2">
            <div
              className={`text-base sm:text-lg font-bold transition-colors leading-tight ${hasDescription ? 'text-white group-hover:text-blue-400' : 'text-white'}`}
            >
              {data.title}
            </div>

            {hasDescription && (
              <div
                aria-expanded={currentExpandedState}
                className="text-blue-400 p-1 flex-shrink-0 flex items-center gap-1"
              >
                <span className="text-xs font-medium uppercase tracking-wider hidden sm:inline">
                  {currentExpandedState ? 'Hide Details' : 'View Details'}
                </span>

                <ChevronDown size={20} className={`transform transition-transform duration-300 ${currentExpandedState ? 'rotate-180' : 'rotate-0'}`} />
              </div>
            )}
          </div>

          <div className="text-sm text-gray-400 mb-3">{data.subtitle}</div>

          {isCareer && data.techStack && (
            <div className="flex flex-wrap gap-2 mb-3">
              {data.techStack.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 sm:px-3 sm:py-1 bg-white/5 border border-white/10 rounded-full text-[10px] sm:text-xs font-medium text-gray-300 transition-all cursor-default hover:bg-white/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {hasDescription && (
            <motion.div
              id={`description-${data.title.replace(/\s/g, '-')}`}
              initial={false}
              animate={{ height: currentExpandedState ? 'auto' : 0, opacity: currentExpandedState ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="text-sm text-gray-300 leading-relaxed pt-2">
                <ReactMarkdown
                  components={{
                    p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                    strong: ({ node, ...props }) => <strong className="font-bold text-white" {...props} />,
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc list-inside space-y-1 pl-2 sm:pl-4 mb-4" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="ml-2 text-gray-300" {...props} />
                    ),
                    h1: ({ node, ...props }) => <h4 className="text-lg font-bold mt-4 mb-2 text-white" {...props} />,
                    h2: ({ node, ...props }) => <h5 className="text-base font-bold mt-3 mb-1 text-white" {...props} />,
                    h3: ({ node, ...props }) => <h6 className="text-sm font-bold mt-3 mb-1 text-white" {...props} />,
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

const tagItemVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const tagContainerVariant = {
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    }
  },
};

export const AboutSection: React.FC = () => {
  const categories = Object.keys(PROFILE.skills);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const activeSkills = PROFILE.skills[activeCategory]?.skills || [];

  return (
    <div className="space-y-16 py-10">

      <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">About Me</h3>

      <section className="space-y-6">
        <p className="text-white-400 text-base md:text-lg leading-relaxed max-w-2xl border-l-2 border-blue-500 pl-4 md:pl-6">
          {PROFILE.about}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={PROFILE.social.resumePDF}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:bg-gray-400 transition-all"
          >
            <Eye size={20} /> View Resume
          </a>
          <a
            href={PROFILE.social.resumePDF}
            download
            className="px-6 py-3 bg-blue-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 hover:bg-blue-500 transition-all"
          >
            <Download size={20} /> Download PDF
          </a>
        </div>
      </section>
      
      <section>
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-6">Technical Arsenal</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 bg-black/20 rounded-xl border border-white/10 overflow-hidden">

          <div className="p-4 sm:p-6 border-b border-white/10 md:border-b-0 md:border-r md:h-full">
            <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Focus Areas</h4>
            <div className="flex flex-col space-y-2">
              {categories.map((category) => {
                const iconName = PROFILE.skills[category].iconName;
                const IconComponent = IconMap[iconName];

                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`text-left px-4 py-2 rounded-lg transition-all text-sm font-semibold transform hover:scale-[1.01] flex items-center
                      ${category === activeCategory
                        ? 'bg-blue-600/30 text-blue-300 shadow-inner shadow-blue-700/30'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                  >
                    {IconComponent && <IconComponent size={16} className="mr-3 flex-shrink-0" />}
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-2 p-4 sm:p-6">
            <h4 className="text-lg font-bold text-white mb-4">{activeCategory}</h4>

            <motion.div
              key={activeCategory}
              initial="hidden"
              animate="visible"
              variants={tagContainerVariant}
              className="flex flex-wrap gap-2 sm:gap-3 min-h-[100px]"
            >
              {activeSkills.map((s, i) => (
                <motion.div
                  key={s}
                  variants={tagItemVariant}
                  className="flex items-center h-7 px-3 sm:px-4 bg-blue-500/10 border border-blue-500/50 rounded-lg text-xs sm:text-sm font-medium text-blue-300 transition-all cursor-default hover:bg-blue-500/20 hover:scale-[1.02]"                >
                  {s}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="space-y-16">

        <section>
          <h3 className="text-2xl sm:text-4xl font-medium text-white uppercase tracking-widest mb-6">Education</h3>
          <div className="space-y-6 border-l border-white/10 ml-0 pl-6 md:pl-8">
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
          <h3 className="text-2xl sm:text-4xl font-medium text-white uppercase tracking-widest mb-6">Career</h3>
          <div className="space-y-6 border-l border-white/10 ml-0 pl-6 md:pl-8">
            {PROFILE.experience.map((job, i) => (
              <TimelineItem
                key={i}
                isCareer={true}
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
      </div>
    </div>
  );
};