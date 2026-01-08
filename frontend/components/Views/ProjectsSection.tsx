import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Code, Github, ChevronLeft, ChevronRight, Layers, X, Maximize, Youtube } from 'lucide-react';
import Image from 'next/image';
import { PROFILE } from '../Common/Data'; // Assuming PROFILE is correctly imported

// Define Project and GalleryImage types based on the updated structure
// (These types should ideally be in '../Common/Data' but are defined here for compilation clarity)
type GalleryImage = { path: string; desc: string; };
type ProjectType = typeof PROFILE.projects[0] & {
  titleImage?: string; 
  galleryImages?: GalleryImage[];
  youtubeUrl?: string; 
};

// --- ProjectGalleryModal Component ---
interface ProjectGalleryModalProps {
  project: ProjectType;
  onClose: () => void;
}

const ProjectGalleryModal: React.FC<ProjectGalleryModalProps> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use the new galleryImages key
  const gallery = project.galleryImages; 

  if (!gallery || gallery.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
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
    // Backdrop click handler for closing
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        key="gallery-modal"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={modalVariants}
        className="relative bg-[#111111] m-4 md:m-8 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-5xl w-full h-[90vh] flex flex-col border border-white/10"
        // Stop propagation to prevent backdrop close on internal clicks
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Modal Header/Title and Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h4 className="text-xl font-bold text-white tracking-tight">{project.title} Gallery</h4>
          <div className="flex items-center gap-2">
            <X 
              size={24} 
              onClick={onClose}
              className="text-gray-400 hover:text-white cursor-pointer transition-colors p-1 rounded-full hover:bg-white/5"
              aria-label="Close gallery"
            />
          </div>
        </div>

        {/* Modal Body: Image and Description */}
        <div className="flex-1 overflow-hidden relative">
          <div className="h-full flex flex-col md:flex-row">
            
            {/* Image Viewer (Left/Top) */}
            <div className="relative w-full md:w-3/4 bg-black/50 overflow-hidden flex items-center justify-center p-4">
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
                        // Use currentImage.path
                        src={currentImage.path}
                        alt={currentImage.desc || 'Gallery Image'}
                        fill
                        priority={true}
                        className="object-contain"
                     />
                  </motion.div>
               </AnimatePresence>

               {/* Navigation Buttons (Absolute) */}
               <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 border border-white/10 text-white/80 hover:bg-black/80 transition-all shadow-xl"
                  aria-label="Previous image"
               >
                  <ChevronLeft size={20} />
               </button>
               <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 border border-white/10 text-white/80 hover:bg-black/80 transition-all shadow-xl"
                  aria-label="Next image"
               >
                  <ChevronRight size={20} />
               </button>
            </div>

            {/* Description/Thumbnail Strip (Right/Bottom) */}
            <div className="w-full md:w-1/4 p-6 overflow-y-auto border-t md:border-t-0 md:border-l border-white/5">
              <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                 Image {currentImageIndex + 1} of {gallery.length}
              </h5>
              
              <div className="mb-6">
                <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                  {currentImage.desc || "A detailed view of the project interface or feature."}
                </p>
              </div>

              {/* Thumbnails */}
              <div className="flex flex-row md:flex-col gap-3">
                 {gallery.map((item, index) => (
                    <div 
                       key={index} 
                       onClick={() => setCurrentImageIndex(index)}
                       className={`relative w-20 h-20 md:w-full md:h-24 rounded-lg overflow-hidden cursor-pointer transition-all ${index === currentImageIndex ? 'ring-2 ring-blue-500 scale-[1.02]' : 'opacity-70 hover:opacity-100'}`}
                    >
                       <Image
                          // Use item.path
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
// --- END ProjectGalleryModal Component ---


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
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  
  const projects = PROFILE.projects as ProjectType[]; // Cast to ProjectType array

  // Calculate current index with wrapping (infinite loop)
  const projectIndex = ((page % projects.length) + projects.length) % projects.length;
  const currentProject = projects[projectIndex];
  
  // Check for gallery availability using the new key
  const hasGallery = !!currentProject.galleryImages && currentProject.galleryImages.length > 0;


  const paginate = (newDirection: number) => {
    // Only allow pagination if the gallery is not open
    if (!isGalleryOpen) {
      setPage([page + newDirection, newDirection]);
    }
  };
  
  // Auto-scrolling useEffect
  useEffect(() => {
    // Only start timer if gallery is closed
    if (isGalleryOpen) return; 

    const timer = setInterval(() => {
      // Auto-scroll forward (direction 1)
      paginate(1); 
    }, AUTO_SCROLL_DELAY);

    // Cleanup interval on component unmount or when dependencies change
    return () => clearInterval(timer);
  }, [page, projects.length, isGalleryOpen]);

  // Function to open the gallery safely
  const openGallery = () => {
    if (hasGallery) {
        setIsGalleryOpen(true);
    }
  };

  // Function to close the gallery
  const closeGallery = () => setIsGalleryOpen(false);


  return (
    <>
      <div className="py-10 flex flex-col h-full justify-center">
        
        {/* Header */}
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
        <div className={`relative h-[600px] w-full overflow-hidden rounded-3xl bg-[#0F0F0F] border border-white/5 shadow-2xl group ${isGalleryOpen ? 'pointer-events-none' : ''}`}>
          
          {/* Absolute Navigation Buttons (Left/Right) */}
          <div className="absolute inset-0 z-20 flex items-center justify-between pointer-events-none">
            {/* Left Button */}
            <button 
              onClick={() => paginate(-1)}
              className="p-4 ml-4 rounded-full bg-black/50 border border-white/10 text-white/80 hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 pointer-events-auto shadow-xl"
              aria-label="Previous project"
              disabled={isGalleryOpen}
            >
              <ChevronLeft size={24} />
            </button>
            
            {/* Right Button */}
            <button 
              onClick={() => paginate(1)}
              className="p-4 mr-4 rounded-full bg-black/50 border border-white/10 text-white/80 hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 pointer-events-auto shadow-xl"
              aria-label="Next project"
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
              className="absolute inset-0 flex flex-col md:flex-row"
            >
              
              {/* --- LEFT: Image / Placeholder (UPDATED) --- */}
              <div 
                onClick={openGallery} 
                className={`w-full md:w-1/2 h-64 md:h-full relative bg-black/20 border-b md:border-b-0 md:border-r border-white/5 overflow-hidden group ${hasGallery ? 'cursor-pointer' : ''}`}
              >
                {currentProject.titleImage ? ( 
                   <div className="relative w-full h-full">
                     <Image 
                       src={currentProject.titleImage} 
                       alt={currentProject.title}
                       fill
                       // **CHANGE:** Use object-contain AND re-add the zoom effect
                       className="object-contain transition-transform duration-700 group-hover:scale-105"
                     />
                     {/* Overlay Gradient */}
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent md:hidden" />
                     {/* Hover/Click Indicator (Only show if gallery available) */}
                     {hasGallery && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <Maximize size={48} className="text-white opacity-80" />
                        </div>
                     )}
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

              {/* --- RIGHT: Content (No changes needed) --- */}
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
                  <div className="flex flex-wrap gap-4">
                    
                    {/* 1. GitHub Button (existing logic) */}
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
                    
                    {/* 2. YouTube Button (newly added logic) */}
                    {currentProject.youtubeUrl && (
                      <a 
                        href={currentProject.youtubeUrl} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-500 transition-all group w-fit shadow-lg shadow-red-900/20"
                      >
                        <Youtube size={15} /> 
                        <span>Watch Live Demo</span>
                        <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
                      </a>
                    )}

                  </div>
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
              onClick={() => setPage([i, i > projectIndex ? 1 : -1])}
              className={`w-2 h-2 rounded-full transition-all ${i === projectIndex ? 'bg-blue-500 w-4' : 'bg-gray-600 hover:bg-gray-400'}`}
              aria-label={`Go to project ${i + 1}`}
              disabled={isGalleryOpen}
            />
          ))}
        </div>
      </div>

      {/* Project Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && currentProject && (
          <ProjectGalleryModal project={currentProject} onClose={closeGallery} />
        )}
      </AnimatePresence>
    </>
  );
};