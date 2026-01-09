// components/Views/RotatingText.tsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RotatingTextProps {
  words: string[];
  className?: string;
}

export const RotatingText: React.FC<RotatingTextProps> = ({ words, className }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [words.length]);

  const currentWord = words[index];

  // Separate the structure/spacing classes from the text/color classes
  // We need to pass the text/color classes to the animated motion.div for Chromium compatibility.
  const baseClasses = "text-3xl md:text-6xl font-bold tracking-tight mb-4 min-h-[1.2em]";

  // Extract text and gradient classes from the original className prop
  // Note: This relies on the ChatSection passing the correct classes.
  // We will assume the passed `className` *only* contains the text styling classes for rotation.
  
  return (
    <div className={baseClasses} style={{ height: '1.2em' }}> 
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentWord}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`inline-block ${className}`} // Apply the text/gradient classes here
        >
          {currentWord}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};