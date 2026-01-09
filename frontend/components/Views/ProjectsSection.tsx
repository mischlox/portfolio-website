// components/Views/ProjectsSection.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Code, Github, ChevronLeft, ChevronRight, X, Maximize, Youtube } from 'lucide-react';
import Image from 'next/image';
import { PROFILE } from '../Common/Data';

type GalleryImage = { path: string; desc: string; };
type ProjectType = typeof PROFILE.projects[0] & {
  titleImage?: string; 
  galleryImages?: GalleryImage[];
  youtubeUrl?: string;
  huggingfaceUrl?: string;
};

interface ProjectGalleryModalProps {
  project: ProjectType;
  onClose: () => void;
}

const ProjectGalleryModal: React.FC<ProjectGalleryModalProps> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const gallery = project.galleryImages; 

  if (!gallery || gallery.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <div className="bg-[#0F0F0F] p-8 rounded-xl shadow-2xl max-w-lg w-full text-center border border-white/10">
          <p className="text-gray-300 mb-4">No gallery images available for **{project.title}**.</p>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const currentImage = gallery[currentImageIndex];

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  }, [gallery.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') nextImage();
      if (event.key === 'ArrowLeft') prevImage();
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextImage, prevImage, onClose]);
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        key="gallery-modal"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={modalVariants}
        className="relative bg-[#111111] m-4 md:m-8 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-5xl w-full h-[85vh] md:h-[90vh] flex flex-col border border-white/10"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h4 className="text-lg md:text-xl font-bold text-white tracking-tight truncate pr-4">{project.title} Gallery</h4>
          <div className="flex items-center gap-2">
            <X 
              size={24} 
              onClick={onClose}
              className="text-gray-400 hover:text-white cursor-pointer transition-colors p-1 rounded-full hover:bg-white/5"
            />
          </div>
        </div>

        <div className="flex-1 overflow-hidden relative">
          <div className="h-full flex flex-col md:flex-row">
            
            <div className="relative w-full h-1/2 md:h-full md:w-3/4 bg-black/40 overflow-hidden flex items-center justify-center p-4">
               <AnimatePresence initial={false} mode="wait">
                  <motion.div
                     key={currentImageIndex}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.3 }}
                     className="w-full h-full relative"
                  >
                     <Image
                        src={currentImage.path}
                        alt={currentImage.desc || 'Gallery Image'}
                        fill
                        priority={true}
                        className="object-contain"
                     />
                  </motion.div>
               </AnimatePresence>

               <button
                  onClick={prevImage}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-black/50 border border-white/10 text-white/80 hover:bg-black/80 transition-all shadow-xl"
               >
                  <ChevronLeft size={20} />
               </button>
               <button
                  onClick={nextImage}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-black/50 border border-white/10 text-white/80 hover:bg-black/80 transition-all shadow-xl"
               >
                  <ChevronRight size={20} />
               </button>
            </div>

            <div className="w-full h-1/2 md:h-full md:w-1/4 p-4 md:p-6 overflow-y-auto border-t md:border-t-0 md:border-l border-white/5 bg-[#111111]">
              <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 md:mb-4">
                 Image {currentImageIndex + 1} of {gallery.length}
              </h5>
              
              <div className="mb-4 md:mb-6">
                <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                  {currentImage.desc || "A detailed view of the project interface or feature."}
                </p>
              </div>

              <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                 {gallery.map((item, index) => (
                    <div 
                       key={index} 
                       onClick={() => setCurrentImageIndex(index)}
                       className={`relative w-20 h-20 md:w-full md:h-24 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all ${index === currentImageIndex ? 'ring-2 ring-blue-500 scale-[1.02]' : 'opacity-70 hover:opacity-100'}`}
                    >
                       <Image
                          src={item.path}
                          alt={item.desc || 'Thumbnail'}
                          fill
                          className="object-cover"
                       />
                    </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

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

const AUTO_SCROLL_DELAY = 6000;

export const ProjectsSection: React.FC = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const projects = PROFILE.projects as ProjectType[];

  const projectIndex = ((page % projects.length) + projects.length) % projects.length;
  const currentProject = projects[projectIndex];
  
  const hasGallery = !!currentProject.galleryImages && currentProject.galleryImages.length > 0;
  const hasTitleImage = !!currentProject.titleImage;

  const paginate = (newDirection: number) => {
    if (!isGalleryOpen) {
      setPage([page + newDirection, newDirection]);
    }
  };
  
  useEffect(() => {
    if (isGalleryOpen || isHovering) return; 

    const timer = setInterval(() => {
      paginate(1); 
    }, AUTO_SCROLL_DELAY);

    return () => clearInterval(timer);
  }, [page, projects.length, isGalleryOpen, isHovering]);

  const openGallery = () => {
    if (hasGallery) {
        setIsGalleryOpen(true);
    }
  };

  const closeGallery = () => setIsGalleryOpen(false);

  return (
    <>
      <div className="flex flex-col h-full justify-center">

        <div className="px-4 py-8 md:p-10 flex justify-start items-end mb-4 md:mb-12">
          <div>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
              My Portfolio
            </h3>
          </div>
        </div>

        <div 
          className={`relative h-auto md:h-[600px] min-h-[500px] w-full overflow-hidden rounded-3xl bg-black/20 border border-white/5 shadow-2xl group ${isGalleryOpen ? 'pointer-events-none' : ''}`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >

            <div className="absolute top-0 right-0 z-30 m-4 px-4 py-1 bg-white/10 text-white/80 text-xs font-semibold rounded-full tracking-wider shadow-lg">
                Project {projectIndex + 1} of {projects.length}
            </div>

          <div className="absolute inset-0 z-20 hidden md:flex items-center justify-between pointer-events-none">
            <button
              onClick={() => paginate(-1)}
              className="p-4 ml-4 rounded-full bg-black/50 border border-white/10 text-white/80 hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 pointer-events-auto shadow-xl"
              disabled={isGalleryOpen}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={() => paginate(1)}
              className="p-4 mr-4 rounded-full bg-black/50 border border-white/10 text-white/80 hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 pointer-events-auto shadow-xl"
              disabled={isGalleryOpen}
            >
              <ChevronRight size={24} />
            </button>
          </div>

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
              className="relative md:absolute inset-0 flex flex-col md:flex-row h-full"
            >

              {hasTitleImage && (
                <div
                  onClick={openGallery}
                  className={`w-full h-48 sm:h-64 md:h-full md:w-1/2 relative bg-black/20 border-b md:border-b-0 md:border-r border-white/5 overflow-hidden group ${hasGallery ? 'cursor-pointer' : ''}`}
                >
                   <div className="relative w-full h-full">
                     <Image
                       src={currentProject.titleImage!}
                       alt={currentProject.title}
                       fill
                       className="object-cover md:object-contain transition-transform duration-700 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent md:hidden" />
                     {hasGallery && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <Maximize size={48} className="text-white opacity-80" />
                        </div>
                     )}
                   </div>
                </div>
              )}

              <div 
                className={`w-full ${hasTitleImage ? 'md:w-1/2' : 'md:w-full'} p-6 md:p-10 flex flex-col justify-center relative bg-[#050505] md:bg-transparent`}
              >

                <div className="flex items-center gap-2 mb-4">
                   <span className="h-px w-8 bg-blue-500"></span>
                   <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
                      {currentProject.cat}
                   </span>
                </div>

                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight">
                  {currentProject.title}
                </h2>

                <p className="text-gray-400 text-sm md:text-lg leading-relaxed mb-6 md:mb-8">
                  {currentProject.desc}
                </p>

                <div className="mb-6 md:mb-8">
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

                <div className="mt-auto pt-6 border-t border-white/5">
                  <div className="flex flex-wrap gap-3">

                    {currentProject.url ? (
                      <a
                        href={currentProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-blue-800 text-white font-bold rounded-xl hover:bg-blue-500 transition-all group w-full sm:w-auto justify-center text-sm md:text-base shadow-lg shadow-blue-900/20"
                      >
                        <Github size={18} />
                        <span>GitHub</span>
                        <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
                      </a>
                    ) : (
                       <div className="inline-flex items-center gap-2 text-gray-500 text-sm cursor-not-allowed px-4 py-2 border border-white/5 rounded-xl">
                          <Code size={16} /> Code N/A
                       </div>
                    )}

                    {currentProject.youtubeUrl && (
                      <a
                        href={currentProject.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-red-800 text-white font-bold rounded-xl hover:bg-red-500 transition-all group w-full sm:w-auto justify-center text-sm md:text-base shadow-lg shadow-red-900/20"
                      >
                        <Youtube size={18} />
                        <span>Demo</span>
                        <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
                      </a>
                    )}
                    {currentProject.huggingfaceUrl && (
                      <a
                        href={currentProject.huggingfaceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-500 transition-all group w-full sm:w-auto justify-center text-sm md:text-base shadow-lg shadow-amber-900/20"
                      >
                        <Code size={18} /> 
                        <span>Try Live</span>
                        <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
                      </a>
                    )}
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage([i, i > projectIndex ? 1 : -1])}
              className={`w-2 h-2 rounded-full transition-all ${i === projectIndex ? 'bg-blue-500 w-4' : 'bg-gray-600 hover:bg-gray-400'}`}
              aria-label={`Go to project ${i + 1}`}
              disabled={isGalleryOpen}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isGalleryOpen && currentProject && (
          <ProjectGalleryModal project={currentProject} onClose={closeGallery} />
        )}
      </AnimatePresence>
    </>
  );
};