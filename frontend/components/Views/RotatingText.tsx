import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RotatingTextProps {
  words: string[];
  className?: string;
}

export const RotatingText: React.FC<RotatingTextProps> = ({ words, className }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Cycles through the words array every 3 seconds
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Display time

    return () => clearInterval(interval);
  }, [words.length]);

  const currentWord = words[index];

  return (
    <div className={className} style={{ height: '1.2em' }}> {/* Fixed height to prevent layout shift */}
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentWord}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {currentWord}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};